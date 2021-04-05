/* eslint-disable no-undef */
const CartService = {
  getUserCart(db, user_id) {
    return db
      .from("cart")
      .select("*")
      .where({ "cart.user_id": user_id })
      .first()
      .then((cart) =>
        db
          .from("cart_item AS ci")
          .column({ cart_item_id: "ci.id" })
          .select("*")
          .where({ "ci.cart_id": cart.id })
          .leftJoin("items", { "ci.item_id": "items.id" })
          .leftJoin("color", { "ci.color_id": "color.id" })
          .column({ color: "color.name" })
          .leftJoin("scent", { "ci.scent_id": "scent.id" })
          .column({ scent: "scent.name" })
      );
  },

  getCartItem(db, cart_item = {}) {
    return db
      .from("cart_item")
      .select("*")
      .where({
        "cart_item.item_id": cart_item.item_id,
        "cart_item.cart_id": cart_item.cart_id,
        "cart_item.color_id": cart_item.color_id,
        "cart_item.scent_id": cart_item.scent_id,
      })
      .first();
  },

  getCartForUser(db, user_id) {
    return db
      .from("cart")
      .select("*")
      .where({ "cart.user_id": user_id })
      .first();
  },
  insertCart(db, newCart) {
    return db
      .insert(newCart)
      .into("cart")
      .returning("*")
      .then(([cart]) => cart);
  },

  insertItemCart(db, newItem) {
    return db
      .insert(newItem)
      .into("cart_item")
      .returning("*")
      .then(([item]) => item);
  },

  deleteItemToCart(db, id) {
    return db("cart_item").where({ id }).delete();
  },

  updateCartItem(db, id, updateItem) {
    return db("cart_item").where({ id }).update(updateItem);
  },
};

module.exports = CartService;
