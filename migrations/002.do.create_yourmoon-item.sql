CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    qty NUMERIC CHECK (qty >= 0),
    img TEXT NOT NULL,
    description TEXT NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE item_scent (
    id SERIAL PRIMARY KEY,
    scent TEXT
);

CREATE TABLE item_color (
    id SERIAL PRIMARY KEY,
    color TEXT
);

ALTER TABLE items  
    ADD COLUMN 
    item_scent_id INTEGER REFERENCES item_scent(id) ON DELETE CASCADE NOT NULL;
ALTER TABLE items  
    ADD COLUMN 
    item_color_id INTEGER REFERENCES item_color(id) ON DELETE CASCADE NOT NULL;

