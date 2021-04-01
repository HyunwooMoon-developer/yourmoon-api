/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const express = require("express");
const xss = require("xss");
const ItemsService = require("./items-service");

const itemsRouter = express.Router();

itemsRouter.route("/").get((req, res, next) => {
  const db = req.app.get("db");
  ItemsService.getAllItems(db)
    .then((items) => {
      res.json(ItemsService.serializeItems(items));
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
    res.json(ItemsService.serializeItem(res.item));
  });

itemsRouter
  .route("/:item_id/reviews")
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
    const db = req.app.get("db");
    ItemsService.getReviewForItem(db, req.params.item_id)
      .then((review) => {
        res.json(ItemsService.serializeItemReviews(review));
      })
      .catch(next);
  });

module.exports = itemsRouter;
