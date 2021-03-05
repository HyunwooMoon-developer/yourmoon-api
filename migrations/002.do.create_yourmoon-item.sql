CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
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
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE item_scent (
    item_scent_id SERIAL PRIMARY KEY,
    item_scent TEXT
);

CREATE TABLE item_color (
    item_color_id SERIAL PRIMARY KEY,
    item_color TEXT
);

ALTER TABLE items  
    ADD COLUMN 
    item_scent_id INTEGER REFERENCES item_scent(item_scent_id) ON DELETE CASCADE NOT NULL;
ALTER TABLE items  
    ADD COLUMN 
    item_color_id INTEGER REFERENCES item_color(item_color_id) ON DELETE CASCADE NOT NULL;

