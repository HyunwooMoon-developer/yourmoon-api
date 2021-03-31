/* eslint-disable no-undef */
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Items Endpoint`, () => {
  let db;

  const testCategories = helpers.makeCategoriesArray();
  const testItems = helpers.makeItemsArray();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());
  before("cleanup", () => helpers.cleanTable(db));
  afterEach("cleanup", () => helpers.cleanTable(db));

  describe(`GET api/item`, () => {
    context(`Given no items`, () => {
      it(`responds with 200 and an empty item`, () => {
        return supertest(app).get("/api/item").expect(200, []);
      });
    });
    context(`Given there are items in the database`, () => {
      beforeEach("insert items", () => {
        return db
          .into("categories")
          .insert(testCategories)
          .then(() => {
            return db.into("items").insert(testItems);
          });
      });

      it(`GET /api/item responds with 200 and all of the items`, ()=> {
          return supertest(app)
          .get('/api/item')
          .expect(200, testItems);
      });
      it(`GET /api/item/:item_id responds with 200 and specific item`, ()=> {
          const itemId = 1;
          const expectedItem = testItems[itemId -1];

          return supertest(app)
          .get(`/api/item/${itemId}`)
          .expect(200, expectedItem);
      })
    });
  });
});
