/* eslint-disable no-undef */
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const bcrypt = require("bcryptjs");
const helpers = require("./test-helpers");
const { expect } = require("chai");

describe("Users Endpoints", () => {
  let db;

  const { testUsers } = helpers.makeYourmoonFixture();
  const testUser = testUsers[0];

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

  describe(`POST /api/user`, () => {
    context("User validation", () => {
      beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

      const requireFields = ["user_name", "password", "full_name"];

      requireFields.forEach((field) => {
        const registerAttemptBody = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: "test password",
        };

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field];

          return supertest(app)
            .post("/api/user")
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            });
        });
      });
      it(`responds with 400 'password must be longer than 8 characters' when empty password`, () => {
        const userShortPass = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: "1234567",
        };

        return supertest(app)
          .post("/api/user")
          .send(userShortPass)
          .expect(400, {
            error: `Password must be longer than 8 characters`,
          });
      });
      it(`responds with 400 'passowd must be less than 72 characters' when long password`, () => {
        const userLongPass = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: "*".repeat(73),
        };

        return supertest(app).post("/api/user").send(userLongPass).expect(400, {
          error: `Password must be less than 72 characters`,
        });
      });
      it(`responds 400 error when password starts with spaces`, () => {
        const userPassStartsSpaces = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: " 11!!AAaa",
        };

        return supertest(app)
          .post("/api/user")
          .send(userPassStartsSpaces)
          .expect(400, {
            error: `Password must not start or end with empty spaces`,
          });
      });
      it(`responds 400 error when password ends with spaces`, () => {
        const userPassEndsSpaces = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: "11!!AAaa ",
        };

        return supertest(app)
          .post("/api/user")
          .send(userPassEndsSpaces)
          .expect(400, {
            error: `Password must not start or end with empty spaces`,
          });
      });
      it(`responds 400 error when password isn't complex enough`, () => {
        const userPassNotComplex = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: "11bbAAaa",
        };

        return supertest(app)
          .post("/api/user")
          .send(userPassNotComplex)
          .expect(400, {
            error: `Password must contain 1 upper case, lower case, number and special character`,
          });
      });
      it(`responds 400 'user name already taken' when user_name isn't unique`, () => {
        const duplicateUser = {
          user_name: testUser.user_name,
          full_name: "test full_name",
          password: "11!!AAaa",
        };

        return supertest(app)
          .post("/api/user")
          .send(duplicateUser)
          .expect(400, {
            error: `Username already taken`,
          });
      });
    });
    context(`Happy Path`, () => {
      it(`responds 201, serialized user with no password`, () => {
        const newUser = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: "11!!AAaa",
        };

        return supertest(app)
          .post("/api/user")
          .send(newUser)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property("id");
            expect(res.body.user_name).to.eql(newUser.user_name);
            expect(res.body.full_name).to.eql(newUser.full_name);
            expect(res.body).to.not.have.property("password");
            expect(res.headers.location).to.eql(`/api/user/${res.body.id}`);
            const expectedDate = new Date().toLocaleString();
            const actualDate = new Date(res.body.date_created).toLocaleString();
            expect(actualDate).to.eql(expectedDate);
          });
      });
      it(`stores the new user in db with bcryped password`, () => {
        const newUser = {
          user_name: "test user_name",
          full_name: "test full_name",
          password: "11!!AAaa",
        };

        return supertest(app)
          .post("/api/user")
          .send(newUser)
          .expect((res) =>
            db
              .from("yourmoon_user")
              .select("*")
              .where({ id: res.body.id })
              .first()
              .then((row) => {
                expect(row.user_name).to.eql(newUser.user_name);
                expect(row.full_name).to.eql(newUser.full_name);
                const expectedDate = new Date().toLocaleString();
                const actualDate = new Date(row.date_created).toLocaleString();
                expect(actualDate).to.eql(expectedDate);

                return bcrypt.compare(newUser.password, row.password);
              })
              .then((compareMatch) => {
                expect(compareMatch).to.be.true;
              })
          );
      });
    });
  });
});
