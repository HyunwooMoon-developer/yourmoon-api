/* eslint-disable no-undef */
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Items Endpoint`, () => {
  let db;

  const {
    testUsers,
    testCategories,
    testItems,
    testReviews,
  } = helpers.makeYourmoonFixture();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTable(db));

  afterEach("cleanup", () => helpers.cleanTable(db));

  describe(`Protected endpoints`, () => {
    beforeEach(`insert items`, () =>
      helpers.seedItems(db, testUsers, testCategories, testItems, testReviews)
    );
  });
  describe(`GET /api/item`, () => {
    context(`Given no items`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/item").expect(200, []);
      });
    });

    context("Given there are items in the database", () => {
      beforeEach("insert things", () =>
        helpers.seedItems(db, testUsers, testCategories, testItems, testReviews)
      );

      it("responds with 200 and all of the items", () => {
        const expectedItems = testItems.map((item) =>
          helpers.makeExpectedItem(testUsers, item, testReviews)
        );
        return supertest(app).get("/api/item").expect(200, expectedItems);
      });
    });
  });
  describe(`GET /api/item/:item_id`, () => {
    context(`Given no items`, () => {
      it(`responds with 400`, () => {
        const itemId = 123456;
        return supertest(app)
          .get(`/api/item/${itemId}`)
          .expect(400, { error: { message: `Item doesn't exist` } });
      });
    });
    context(`Given there are itmes in the database`, () => {
      beforeEach(`insert items`, () =>
        helpers.seedItems(db, testUsers, testCategories, testItems, testReviews)
      );

      it(`responds with 200 and the specified item`, () => {
        const itemId = 1;
        const expectedItem = helpers.makeExpectedItem(
          testUsers,
          testItems[itemId - 1],
          testReviews
        );
        return supertest(app)
          .get(`/api/item/${itemId}`)
          .expect(200, expectedItem);
      });
    });
  });
  describe(`GET /api/item/:item_id/reviews`, () => {
    context("Given no items", () => {
      it("responds with 400", () => {
        const itemId = 123;
        return supertest(app)
          .get(`/api/item/${itemId}/reviews`)
          .expect(400, { error: { message: `Item doesn't exist` } });
      });
    });
    context("Given there are reviews for item in the database", () => {
      beforeEach(`insert items`, () =>
        helpers.seedItems(db, testUsers, testCategories, testItems, testReviews)
      );

      it("responds with 200 and the specified reviews", () => {
        const itemId = 1;
        const expectedReviews = helpers.makeExpectedItemReviews(
          testUsers,
          itemId,
          testReviews
        );

        return supertest(app)
          .get(`/api/item/${itemId}/reviews`)
          .expect(200, expectedReviews);
      });
    });
  });
});
