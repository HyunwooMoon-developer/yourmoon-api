CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL,
    tax NUMERIC
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    discount NUMERIC,
    qty NUMERIC CHECK (qty >= 0),
    img TEXT NOT NULL,
    description TEXT NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE item_scent (
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL,
    id SERIAL PRIMARY KEY,
    scent TEXT
);

CREATE TABLE item_color (
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL,
    id SERIAL PRIMARY KEY,
    color TEXT
);