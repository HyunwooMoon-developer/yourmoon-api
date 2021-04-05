/* eslint-disable no-undef */
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Protected Endpoints", () => {
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
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());
  before("cleanup", () => helpers.cleanTable(db));
  afterEach("cleanup", () => helpers.cleanTable(db));

  beforeEach("insert items", () =>
    helpers.seedItems(db, testUsers, testCategories, testItems, testReviews)
  );

  const protectedEndpoint = [
    { name: "POST /api/review", path: "/api/review", method: supertest(app).post},
  ];

  protectedEndpoint.forEach((endpoint) => {
      describe(endpoint.name, ()=> {
          it(`Responds 401 'Missing Basic Token' when no bearer token` , () => {
              return endpoint.method(endpoint.path).expect(401, {error : `Missing bearer token`});
          })
          it(`Responds 401 'Unauthorized Request' when invalid JWT secret` , () => {
              const validUser = testUsers[0]
              const invalidUser = 'bad-secret'
              return endpoint.method(endpoint.path)
              .set('Authorization' , helpers.makeAuthHeader(validUser, invalidUser))
              .expect(401, {error : `Unauthorized Request`})
          })
          it(`Responds 401 'Unauthorized Request' when invalid sub in payload` , () => {
              const invalidUser = {user_name : 'user_not_existy', id : 1}
              return endpoint.method(endpoint.path)
              .set('Authorization' , helpers.makeAuthHeader(invalidUser))
              .expect(401, {
                  error: `Unauthorized Request`
              })
          })
      })
  })
});
