CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER CONSTRAINT check_rating CHECK(rating between 0 and 5),
    date_created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id INTEGER REFERENCES yourmoon_user(user_id) ON DELETE CASCADE NOT NULL,
    item_id INTEGER REFERENCES items(item_id) ON DELETE CASCADE NOT NULL
)

