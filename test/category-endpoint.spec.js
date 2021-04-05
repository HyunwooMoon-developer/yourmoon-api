/* eslint-disable no-undef */
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Categories Endpoints`, () => {
  let db;

  const { testCategories } = helpers.makeYourmoonFixture();

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

  describe(`GET /api/category`, () => {
    context(`Given no category`, () => {
      it(`responds with 200 and an empty category`, () => {
        return supertest(app).get(`/api/category`).expect(200, []);
      });
    });
    context(`Given there are categories in the database`, () => {
      beforeEach(`Insert categories`, () => {
        return db.into("categories").insert(testCategories);
      });
      it(`GET /api/category responds with 200 and all of the categories`, () => {
        return supertest(app).get(`/api/category`).expect(200, testCategories);
      });
      it(`GET api/category/category_id responds wit 200 and the specific list`, () => {
        const categoryId = 1;
        const expectedCategory = testCategories[categoryId - 1];

        return supertest(app)
          .get(`/api/category/${categoryId}`)
          .expect(200, expectedCategory);
      });
    });
  });
});
