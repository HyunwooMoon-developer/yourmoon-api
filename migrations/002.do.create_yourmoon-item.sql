CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    img TEXT NOT NULL,
    description TEXT NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE NOT NULL
);
