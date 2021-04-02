/* eslint-disable no-undef */
const ColorServices = {
    getColorByName(db, name) {
      return db.from("color").where("name", name).first();
    },
  };
  
  module.exports = ColorServices;