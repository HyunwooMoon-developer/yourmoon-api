/* eslint-disable no-undef */
const ScentServices = {
    getScentByName(db, name) {
      return db.from("scent").where("name", name).first();
    },
  };
  
  module.exports = ScentServices;