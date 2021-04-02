/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./errorHandler");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const categoryRouter = require("./category/category-router");
const itemsRouter = require("./items/items-router");
const reviewRouter = require("./review/review-router");
const cartRouter = require("./cart/cart-router");

const app = express();
//pipeline begins
//standard middleware
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//route
app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemsRouter);
app.use("/api/review", reviewRouter);
app.use("/api/user/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello, boilerplate!");
});

//error handler
app.use(errorHandler);

module.exports = app;
