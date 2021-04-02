/* eslint-disable no-undef */
const express = require("express");
const CartService = require("./cart-service");
const { requireAuth } = require("../middleware/jwt-auth");

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

    const { item_id, qty } = req.body;
    const user_id = req.user.id;
    CartService.getCartForUser(db, user_id)
      .then((cart) => {
        console.log("cart", cart);
        const newItem = { cart_id: cart.id, item_id, qty };
        for (const [key, value] of Object.entries(newItem))
          if (value == null)
            return res.status(400).json({
              error: { message: `Missing ${key} in request body` },
            });
        // check database to see if item exists with same cart_id, item_id, scent_id, and color_id

        /*if(databse){
          qty += qty ;
        }*/

        CartService.insertItemCart(db, newItem)
          .then((item) => {
            res.status(201).json(item);
          })
          .catch(next);
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
