/* eslint-disable no-undef */
const express = require("express");
const CartService = require("./cart-service");
const { requireAuth } = require("../middleware/jwt-auth");

const cartRouter = express.Router();
const jsonParser = express.json();

cartRouter
  .route("/user")
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get("db");

    CartService.getUserCart(db, req.user.id)
      .then((cart) => {
        return res.status(200).json(cart);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const db = req.app.get("db");

    const { item_id, cart_qty } = req.body;
    const user_id = req.user.id;

    const newItem = { user_id, item_id, cart_qty };
    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` },
        });

    CartService.insertItemToCart(db, newItem)
      .then((item) => {
        res.status(201).json(item);
      })
      .catch(next);
  })
  .delete(jsonParser, (req, res, next) => {
    const db = req.app.get("db");

    const { item_id } = req.body;
    const user_id = req.user.id;

    const deleteItem = { item_id, user_id };
    for (const [key, value] of Object.entries(deleteItem))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    CartService.deleteItemToCart(db, item_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = cartRouter;
