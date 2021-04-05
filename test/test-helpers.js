/* eslint-disable no-undef */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user1",
      full_name: "test-user1",
      password: "testpass",
      date_created: "2021-03-05T16:28:32.615Z",
    },
    {
      id: 2,
      user_name: "test-user2",
      full_name: "test-user2",
      password: "testpass",
      date_created: "2021-03-05T16:28:32.615Z",
    },
    {
      id: 3,
      user_name: "test-user3",
      full_name: "test-user3",
      password: "testpass",
      date_created: "2021-03-05T16:28:32.615Z",
    },
  ];
}

function makeCategoriesArray() {
  return [
    {
      id: 1,
      category_name: "CANDLE",
    },
    {
      id: 2,
      category_name: "ETC",
    },
  ];
}

function makeItemsArray(users) {
  return [
    {
      id: 1,
      item_name: "test1",
      price: "10.00",
      img: [
        "https://i.etsystatic.com/23622696/r/il/fb795c/2583878936/il_1588xN.2583878936_n7e6.jpg",
      ],
      description: "description",
      date_created: "2021-03-05T16:28:32.615Z",
      category_id: 1,
      user_id: users[0].id,
    },
    {
      id: 2,
      item_name: "test2",
      price: "10.00",
      img: [
        "https://i.etsystatic.com/23622696/r/il/fb795c/2583878936/il_1588xN.2583878936_n7e6.jpg",
      ],
      description: "description",
      date_created: "2021-03-05T16:28:32.615Z",
      category_id: 2,
      user_id: users[0].id,
    },
  ];
}

function makeReviewsArray(users, items) {
  return [
    {
      id: 1,
      rating: 5,
      user_id: users[1].id,
      item_id: items[0].id,
      date_created: "2021-03-05T16:28:32.615Z",
      text: "test 1",
    },
    {
      id: 2,
      rating: 4,
      user_id: users[2].id,
      item_id: items[0].id,
      date_created: "2021-03-05T16:28:32.615Z",
      text: "test 1",
    },
  ];
}

function makeExpectedItem(users, item, reviews = []) {
  const user = users.find((user) => user.id === item.user_id);

  const itemReviews = reviews.filter((review) => review.item_id === item.id);

  const number_of_reviews = itemReviews.length;
  const average_review_rating = calculateAvarage(itemReviews);

  return {
    id: item.id,
    item_name: item.item_name,
    price: item.price,
    img: item.img,
    scents: [null],
    colors: [null],
    description: item.description,
    date_created: item.date_created,
    category_id: item.category_id,
    number_of_reviews,
    average_review_rating,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      date_created: user.date_created,
    },
  };
}

function makeExpectedItemReviews(users, itemId, reviews) {
  const expectedReviews = reviews.filter((review) => review.item_id === itemId);

  return expectedReviews.map((review) => {
    const reviewUser = users.find((user) => user.id === review.user_id);
    return {
      id: review.id,
      text: review.text,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        full_name: reviewUser.full_name,
        date_created: reviewUser.date_created,
      },
    };
  });
}

function calculateAvarage(reviews) {
  if (!reviews.length) return 0;

  const sum = reviews.map((review) => review.rating).reduce((a, b) => a + b);
  return Math.round(sum / reviews.length);
}

function cleanTable(db) {
  return db.raw(`TRUNCATE
  review,
  items,
  categories,
  yourmoon_user,
  scent_item,
  color_item,
  scent,
  color
  RESTART IDENTITY CASCADE`);
}
function makeYourmoonFixture() {
  const testUsers = makeUsersArray();
  const testCategories = makeCategoriesArray();
  const testItems = makeItemsArray(testUsers);
  const testReviews = makeReviewsArray(testUsers, testItems);

  return { testUsers, testCategories, testItems, testReviews };
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("yourmoon_user")
    .insert(preppedUsers)
    .then(() =>
      //update the auto sequence to stay in sync
      db.raw(`SELECT setval('yourmoon_user_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}

function seedItems(db, users, categories, items, reviews = []) {
  return seedUsers(db, users)
    .then(() => db.into("categories").insert(categories))
    .then(() => db.into("items").insert(items))
    .then(() => reviews.length && db.into("review").insert(reviews));
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeCategoriesArray,
  makeItemsArray,
  makeReviewsArray,
  makeExpectedItem,
  makeExpectedItemReviews,
  makeAuthHeader,
  seedUsers,
  seedItems,

  makeYourmoonFixture,
  cleanTable,
};
