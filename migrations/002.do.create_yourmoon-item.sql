CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    img TEXT[],
    description TEXT NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES yourmoon_user(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE scent(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE scent_item(
    id SERIAL PRIMARY key,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL,
    scent_id INTEGER REFERENCES scent(id) on DELETE CASCADE NOT NULL
);

CREATE TABLE color(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE color_item(
     id SERIAL PRIMARY key,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL,
    color_id INTEGER REFERENCES color(id) ON DELETE CASCADE NOT NULL
);