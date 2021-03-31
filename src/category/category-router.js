/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const xss = require("xss");
const CategoryServices = require("./category-service");

const categoryRouter = express.Router();

const serializedCategory = (category) => ({
  id: category.id,
  category_name: xss(category.category_name),
});

categoryRouter.route("/").get(async (req, res, next) => {
  const db = req.app.get("db");

  await CategoryServices.getAllCategories(db)
    .then((categories) => {
      res.json(categories.map(serializedCategory));
    })
    .catch(next);
});

categoryRouter
  .route("/:category_id")
  .all(async (req, res, next) => {
    const db = req.app.get("db");

    await CategoryServices.getCategoryById(db, req.params.category_id)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            error: { message: `Category doesn't exist` },
          });
        }
        res.category = category;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializedCategory(res.category));
  });

module.exports = categoryRouter;
