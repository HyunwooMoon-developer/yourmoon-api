/* eslint-disable no-undef */

/* eslint-disable no-undef */
const xss = require("xss");
const Treeize = require("treeize");

const ItemsService = {
  getAllItems(db, page) {
    const itemPerPage = 4;
    const offset = itemPerPage * (page -1)

    return db
      .from("items AS i")
      .select(
        "i.id",
        "i.item_name",
        "i.price",
        "i.img",
        "i.date_created",
        "i.description",
        "i.category_id",
        ...userField,
        db.raw(`count(DISTINCT review) AS number_of_reviews`),
        db.raw(`AVG(review.rating) AS average_review_rating`),
      )
      .select(db.raw(`ARRAY_AGG(DISTINCT scent.name) AS scents`))
      .fullOuterJoin("scent_item", {"scent_item.item_id" : "i.id"})
      .fullOuterJoin("scent", {"scent_item.scent_id": "scent.id"})
      .select(db.raw(`ARRAY_AGG(DISTINCT color.name) AS colors`))
      .fullOuterJoin("color_item", {"color_item.item_id" : "i.id"})
      .fullOuterJoin("color", {"color_item.color_id" : "color.id"})
      .leftJoin("review", {"i.id" :  "review.item_id"})
      .leftJoin("yourmoon_user AS user", "i.user_id", "user.id")
      .groupBy("i.id", "user.id")
      .orderBy('date_created', 'desc')
      .limit(itemPerPage)
      .offset(offset)
  },
  getItemById(db, id) {
    return this.getAllItems(db).where("i.id", id).first();
  },
  getReviewForItem(db, item_id) {
    return db
      .from("review")
      .select(
        "review.id",
        "review.rating",
        "review.text",
        "review.date_created",
        ...userField
      )
      .where("review.item_id", item_id)
      .leftJoin("yourmoon_user AS user", "review.user_id", "user.id")
      .groupBy("review.id", "user.id");
  },

  serializeItems(items) {
    return items.map(this.serializeItem);
  },
  serializeItem(item) {
    const itemTree = new Treeize();

    const itemData = itemTree.grow([item]).getData()[0];

    return {
      id: itemData.id,
      category_id: itemData.category_id,
      item_name: xss(itemData.item_name),
      date_created: itemData.date_created,
      img: itemData.img,
      description: xss(itemData.description),
      price: xss(itemData.price),
      colors : itemData.colors,
      scents: itemData.scents,
      user: itemData.user || {},
      number_of_reviews: Number(itemData.number_of_reviews) || 0,
      average_review_rating: Math.round(itemData.average_review_rating) || 0,
    };
  },

  serializeItemReviews(reviews) {
    return reviews.map(this.serializeItemReview);
  },
  serializeItemReview(review) {
    const reviewTree = new Treeize();

    const reviewData = reviewTree.grow([review]).getData()[0];

    return {
      id: reviewData.id,
      rating: reviewData.rating,
      item_id: reviewData.item_id,
      text: xss(reviewData.text),
      user: reviewData.user || {},
      date_created: reviewData.date_created,
    };
  },
};

const userField = [
  "user.id AS user:id",
  "user.user_name AS user:user_name",
  "user.full_name AS user:full_name",
  "user.date_created AS user:date_created",
];

module.exports = ItemsService;
