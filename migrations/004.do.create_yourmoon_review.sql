CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER CONSTRAINT check_rating CHECK(rating between 0 and 5),
    date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id INTEGER REFERENCES yourmoon_user(id) ON DELETE CASCADE NOT NULL,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL
);

