/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Reviews Endpoint`, () => {
  let db;

  const {
    testItems,
    testCategories,
    testUsers,
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

  describe(`POST /api/reviews`, () => {
    beforeEach(`insert items`, () =>
      helpers.seedItems(db, testUsers, testCategories, testItems)
    );
    it(`creates a review, responding with 201 and the new review`, function () {
      this.retries(3);
      const testItem = testItems[0];
      const testUser = testUsers[0];
      const newReview = {
        text: "test3",
        rating: 4,
        item_id: testItem.id,
      };
      return supertest(app)
        .post(`/api/review`)
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send(newReview)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property("id");
          expect(res.body.rating).to.eql(newReview.rating);
          expect(res.body.text).to.eql(newReview.text);
          expect(res.body.item_id).to.eql(newReview.item_id);
          expect(res.body.user.id).to.eql(testUser.id);
          expect(res.headers.location).to.eql(`/api/review/${res.body.id}`);
          const expectedDate = new Date().toLocaleString();
          const actualDate = new Date(res.body.date_created).toLocaleString();
          expect(actualDate).to.eql(expectedDate);
        })
        .expect((res) =>
          db
            .from("review")
            .select("*")
            .where({ id: res.body.id })
            .first()
            .then((row) => {
              expect(row.text).to.eql(newReview.text);
              expect(row.rating).to.eql(newReview.rating);
              expect(row.item_id).to.eql(newReview.item_id);
              expect(row.user_id).to.eql(testUser.id);
              const expectedDate = new Date().toLocaleString();
              const actualDate = new Date(row.date_created).toLocaleString();
              expect(actualDate).to.eql(expectedDate);
            })
        );
    });

    const requiredFields = ["text", "rating", "item_id"];

    requiredFields.forEach((field) => {
      const testItem = testItems[0];
      const testUser = testUsers[0];
      const newReview = {
        text: "Test new review",
        rating: 3,
        item_id: testItem.id,
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field];

        return supertest(app)
          .post("/api/review")
          .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
          .send(newReview)
          .expect(400, {
            error: { message: `Missing ${field} in request body` },
          });
      });
    });
  });
});
