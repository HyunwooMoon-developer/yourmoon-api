/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require("path");
const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const ReviewService = require("./review-service");

const reviewRouter = express.Router();
const jsonParser = express.json();

reviewRouter.route("/").post(requireAuth, jsonParser, (req, res, next) => {
  const db = req.app.get("db");

  const { item_id, rating, text } = req.body;
  const newReview = { item_id, rating, text };

  for (const [key, value] of Object.entries(newReview))
    if (value == null)
      return res.status(400).json({
        error: { message: `Missing ${key} in request body` },
      });
  newReview.user_id = req.user.id;
  newReview.date_created = req.date_created;

  ReviewService.insertReview(db, newReview)
    .then((review) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${review.id}`));
    })
    .catch(next);
});
reviewRouter
  .route("/:review_id")
  .all(requireAuth)
  .all(async (req, res, next) => {
    const db = req.app.get("db");

    await ReviewService.getReviewById(db, req.params.review_id)
      .then((review) => {
        if (!review) {
          return res.status(400).json({
            error: { message: `Review doesn't exist` },
          });
        }
        res.review = review;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(ReviewService.serializeReview(res.review));
  })
  .delete((req, res, next) => {
    const db = req.app.get("db");

    ReviewService.deleteReview(db, req.params.review_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

module.exports = reviewRouter;
