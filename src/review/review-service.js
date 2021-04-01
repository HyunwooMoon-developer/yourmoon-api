/* eslint-disable no-undef */
const xss = require('xss');

const ReviewService = {
  getReviewById(db, id) {
    return db
      .from('review')
      .select(
        'review.id',
        'review.rating',
        'review.text',
        'review.date_created',
        'review.item_id',
        db.raw(
          `row_to_json(
                    (SELECT tmp FROM(
                        SELECT
                        u.id,
                        u.user_name,
                        u.full_name,
                        u.date_created
                    )tmp)
                     ) AS "user"`
        )
      )
      .leftJoin('yourmoon_user AS u', 'review.user_id', 'u.id')
      .where('review.id', id)
      .first();
  },
  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('review')
      .returning('*')
      .then(([review]) => review)
      .then((review) => ReviewService.getReviewById(db, review.id));
  },
  deleteReview(db, id){
    return db('review')
        .where({id})
        .delete()
  },
  updateReview(db, id, updateReview){
    return db('review')
    .where({id})
    .update(updateReview)
  },
  serializeReview(review){
      return{
          id : review.id,
          rating: review.rating,
          text: xss(review.text),
          itme_id : review.item_id,
          date_created : review.date_created,
          user: review.user || {}
      }
  }

};

module.exports = ReviewService;
