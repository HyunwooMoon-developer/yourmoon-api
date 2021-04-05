/* eslint-disable no-undef */
const express = require("express");
const CartService = require("./cart-service");
const { requireAuth } = require("../middleware/jwt-auth");
const ScentServices = require("../scent/scent-service");
const ColorServices = require("../color/color-service");

const cartRouter = express.Router();
const jsonParser = express.json();

cartRouter
  .route("/")
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

    console.log("req.body", req.body);
    const { item_id, qty, scent, color } = req.body;
    const user_id = req.user.id;
    CartService.getCartForUser(db, user_id)
      .then(async (cart) => {
        const newItem = { cart_id: cart.id, item_id, qty };
        for (const [key, value] of Object.entries(newItem))
          if (value == null)
            return res.status(400).json({
              error: { message: `Missing ${key} in request body` },
            });

        newItem.scent_id = (await ScentServices.getScentByName(db, scent)).id;
        newItem.color_id = (await ColorServices.getColorByName(db, color)).id;
        // check database to see if item exists with same cart_id, item_id, scent_id, and color_id
        let existingItem = await CartService.getCartItem(db, newItem);
        let item;
        if (existingItem) {
          item = await CartService.updateCartItem(db, existingItem.id, {
            qty: existingItem.qty + newItem.qty,
          });
        } else {
          item = await CartService.insertItemCart(db, newItem);
        }
        res.status(201).json({ ...item, scent, color });
      })
      .catch(next);
  })
  .delete(jsonParser, (req, res, next) => {
    const db = req.app.get("db");
    console.log(req.body);
    const { cart_item_id } = req.body;

    CartService.deleteItemToCart(db, cart_item_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = cartRouter;
