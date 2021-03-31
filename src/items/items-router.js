/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const express = require("express");
const xss = require("xss");
const ItemsService = require("./items-service");

const itemsRouter = express.Router();

const serializedItems = (item) => ({
  id: item.id,
  item_name: xss(item.item_name),
  price: xss(item.price),
  img: xss(item.img),
  description: xss(item.description),
  date_created: item.date_created,
  category_id: item.category_id,
});


itemsRouter.route("/").get(async (req, res, next) => {
  const db = req.app.get("db");

  await ItemsService.getAllItems(db)
    .then((items) => {
      res.json(items.map(serializedItems));
    })
    .catch(next);
});

itemsRouter
  .route("/:item_id")
  .all(async (req, res, next) => {
    const db = req.app.get("db");

    await ItemsService.getItemById(db, req.params.item_id)
      .then((item) => {
        if (!item) {
          return res.status(400).json({
            error: { message: `Item doesn't exist` },
          });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializedItems(res.item));
  });

module.exports = itemsRouter;
