/* eslint-disable no-undef */
const CategoryServices = {
  getAllCategories(knex) {
    return knex.select("*").from("categories");
  },
  getCategoryById(knex, id) {
    return knex.from("categories").where("id", id).first();
  },
};

module.exports = CategoryServices;
