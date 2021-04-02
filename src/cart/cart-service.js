/* eslint-disable no-undef */
const CartService = {
    getUserCart(db, user_id){
        return db
        .from('items AS i')
        .select(
            'i.id',
            'i.item_name',
            'i.price',
            'i.img'
        )
        .leftJoin('cart', 'i.id', 'cart.item_id')
        .leftJoin('yourmoon_user AS user', 'user.id', 'cart.user_id')
        .where('cart.user_id', user_id)
    },

   insertItemToCart(db, newItem){
        return db
        .insert(newItem)
        .into('cart')
        .returning('*')
        .then(([item]) => item)
    },
    deleteItemToCart(db, item_id){
        return db('cart')
        .Where({item_id})
        .delete()
    }
}

module.exports = CartService;