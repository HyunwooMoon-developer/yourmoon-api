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
      );

    /*return db
      .from("items")
      .select("items.id", "items.item_name", "items.img", "items.price")
      .leftJoin('cart_item AS ci', {'cart.id' : 'ci.cart_id'})
      .where({ "cart.user_id": user_id });*/
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
};

module.exports = CartService;
