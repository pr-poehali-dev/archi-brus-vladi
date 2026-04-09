"""Приём и получение заявок с сайта АРХИБРУС."""

import json
import os
import urllib.parse
import pg8000.native


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

SCHEMA = "t_p27439606_archi_brus_vladi"


def get_conn():
    r = urllib.parse.urlparse(os.environ["DATABASE_URL"])
    return pg8000.native.Connection(
        user=r.username,
        password=r.password,
        host=r.hostname,
        port=r.port or 5432,
        database=r.path.lstrip("/"),
    )


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = (body.get("name") or "").strip()
        phone = (body.get("phone") or "").strip()
        goal = (body.get("goal") or "").strip()

        if not name or not phone:
            return {
                "statusCode": 400,
                "headers": CORS,
                "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
            }

        conn = get_conn()
        name_s = name.replace("'", "''")
        phone_s = phone.replace("'", "''")
        goal_s = goal.replace("'", "''")
        sql = f"INSERT INTO {SCHEMA}.leads (name, phone, goal) VALUES ('{name_s}', '{phone_s}', '{goal_s}') RETURNING id"
        row = conn.run(sql)
        conn.close()

        return {
            "statusCode": 200,
            "headers": CORS,
            "body": json.dumps({"ok": True, "id": row[0][0]}, ensure_ascii=False),
        }

    if method == "GET":
        conn = get_conn()
        rows = conn.run(
            f"SELECT id, name, phone, goal, created_at FROM {SCHEMA}.leads ORDER BY created_at DESC LIMIT 100"
        )
        conn.close()

        leads = [
            {"id": r[0], "name": r[1], "phone": r[2], "goal": r[3] or "", "created_at": str(r[4])}
            for r in rows
        ]
        return {
            "statusCode": 200,
            "headers": CORS,
            "body": json.dumps({"leads": leads}, ensure_ascii=False),
        }

    return {"statusCode": 405, "headers": CORS, "body": ""}