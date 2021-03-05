CREATE TABLE yourmoon_user (
 id SERIAL PRIMARY KEY,
 user_name TEXT NOT NULL UNIQUE,
 full_name TEXT NOT NULL,
 password TEXT NOT NULL,
 date_created TIMESTAMPTZ NOT NULL DEFAULT NOW()
);