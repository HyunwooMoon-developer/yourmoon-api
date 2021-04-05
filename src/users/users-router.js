/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const CartService = require("../cart/cart-service");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.post("/", jsonParser, async (req, res, next) => {
  const { user_name, full_name, password } = req.body;

  for (const field of ["user_name", "full_name", "password"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`,
      });

  try {
    const passwordError = UsersService.validatePassword(password);

    if (passwordError) return res.status(400).json({ error: passwordError });

    const hasUserWithUserName = await UsersService.hasUserWithUserName(
      req.app.get("db"),
      user_name
    );
    if (hasUserWithUserName)
      return res.status(400).json({ error: `Username already taken` });

    const hashPassword = await UsersService.hashPassword(password);

    const newUser = {
      user_name,
      password: hashPassword,
      full_name,
      date_created: "now()",
    };

    const user = await UsersService.insertUser(req.app.get("db"), newUser);

    const newCart = {
      user_id: user.id,
      date_created: "now()",
    };

    await CartService.insertCart(req.app.get("db"), newCart);

    res
      .status(201)
      .location(path.posix.join(req.originalUrl, `/${user.id}`))
      .json(UsersService.serializeUser(user));
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
