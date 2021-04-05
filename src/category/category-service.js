/* eslint-disable no-undef */
const CategoryServices = {
  getAllCategories(db) {
    return db.select("*").from("categories");
  },
  getCategoryById(db, id) {
    return db.from("categories").where("id", id).first();
  },
};

module.exports = CategoryServices;
