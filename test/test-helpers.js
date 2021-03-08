/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray(){
    return [
        {
            id: 1,
            user_name: 'test-user1',
            full_name: 'test-user1',
            password:'testpass',
            date_created: '2021-03-05T16:28:32.615Z',
        },
        {
            id: 2,
            user_name : 'test-user2',
            full_name: 'test-user2',
            password:'testpass',
            date_created: '2021-03-05T16:28:32.615Z',
        },
        {
            id: 3,
            user_name: 'test-user3',
            full_name: 'test-user3',
            password:'testpass',
            date_created: '2021-03-05T16:28:32.615Z',
        }
    ]
}

function cleanTable(db){
    return db.transaction(trx=> 
        trx
        .raw(
            `TRUNCATE 
            yourmoon_user,
            categories,
            items,
            item_scent,
            item_color,
            cart,
            review`
        )
        .then(()=>
        Promise.all([
            trx.raw(`ALTER SEQUENCE yourmoon_user_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE categories_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE items_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE item_scent_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE item_color_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE cart_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE review_id_seq minvalue 0 START WITH 1`),
            trx.raw(`SELECT setval('yourmoon_user_id_seq',0)`),
            trx.raw(`SELECT setval('categories_id_seq',0)`),
            trx.raw(`SELECT setval('items_id_seq',0)`),
            trx.raw(`SELECT setval('item_scent_id_seq',0)`),
            trx.raw(`SELECT setval('item_color_id_seq',0)`),
            trx.raw(`SELECT setval('cart_id_seq',0)`),
            trx.raw(`SELECT setval('review_id_seq',0)`),
            
        ])
        )
        )
}

function seedUsers(db, users){
    const preppedUsers = users.map((user)=>({
        ...user,
        password: bcrypt.hashSync(user.password, 1),
    }));
    return db
    .into('yourmoon_user')
    .insert(preppedUsers)
    .then(()=>
    //update the auto sequence to stay in sync
    db.raw(`SELECT setval('yourmoon_user_id_seq', ?)`,[
        users[users.length -1].id,
    ])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET){
    const token = jwt.sign({user_id: user.id}, secret, {
        subject : user.user_name,
        algorithm : 'HS256',
    });
    return `Bearer ${token}`;
}


module.exports = {
    makeUsersArray,
    makeAuthHeader,
    seedUsers,

    cleanTable
}