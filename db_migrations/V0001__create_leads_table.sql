CREATE TABLE IF NOT EXISTS t_p27439606_archi_brus_vladi.leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  goal TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);