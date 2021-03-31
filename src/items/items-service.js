/* eslint-disable no-undef */


/* eslint-disable no-undef */
const ItemsService = {
  getAllItems(db) {
    return db.select("*").from("items");
  },
  getItemById(db, id) {
    return this.getAllItems(db).where("id", id).first();
  },

};

module.exports = ItemsService;
