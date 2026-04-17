"""Приём и получение заявок с сайта АРХИБРУС."""

import json
import os
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pg8000.native

MAIL_FROM = os.environ.get("MAIL_EMAIL", "")
MAIL_TO = os.environ.get("MAIL_EMAIL", "")


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

        lead_id = row[0][0]

        mail_pass = os.environ.get("MAIL_PASSWORD", "")
        if mail_pass:
            try:
                msg = MIMEMultipart("alternative")
                msg["Subject"] = f"Новая заявка #{lead_id} — АРХИБРУС"
                msg["From"] = MAIL_FROM
                msg["To"] = MAIL_TO
                html = f"""
                <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto">
                  <div style="background:#1A3C34;padding:24px 32px">
                    <span style="color:#fff;font-size:22px;font-weight:bold">АРХИ<span style="color:#D4AF37">БРУС</span></span>
                  </div>
                  <div style="padding:32px;background:#f9f9f9;border:1px solid #e5e5e5">
                    <h2 style="color:#1A3C34;margin:0 0 24px">Новая заявка с сайта</h2>
                    <table style="width:100%;border-collapse:collapse">
                      <tr><td style="color:#888;padding:8px 0;width:120px">Имя</td><td style="color:#1A3C34;font-weight:bold;padding:8px 0">{name}</td></tr>
                      <tr><td style="color:#888;padding:8px 0">Телефон</td><td style="color:#1A3C34;font-weight:bold;padding:8px 0">{phone}</td></tr>
                      <tr><td style="color:#888;padding:8px 0">Цель</td><td style="color:#1A3C34;padding:8px 0">{goal or "—"}</td></tr>
                    </table>
                    <div style="margin-top:24px">
                      <a href="tel:{phone}" style="background:#D4AF37;color:#1A3C34;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block">Позвонить клиенту</a>
                    </div>
                  </div>
                </div>
                """
                msg.attach(MIMEText(html, "html", "utf-8"))
                with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
                    server.login(MAIL_FROM, mail_pass)
                    server.sendmail(MAIL_FROM, MAIL_TO, msg.as_string())
            except Exception as e:
                print(f"Mail error: {e}")

        return {
            "statusCode": 200,
            "headers": CORS,
            "body": json.dumps({"ok": True, "id": lead_id}, ensure_ascii=False),
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