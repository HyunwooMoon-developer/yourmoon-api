# YOURMOON

## Application Summary

- Users can register or login.
- Users can put the scent, color, and quantity in the cart.
- Users can add or delete their own review.

## Link

Live App : 
Client Repo : https://github.com/HyunwooMoon-developer/yourmoon-client.git

## What I use for App

- Node and Express
  - Authentication via JWT
  - RESTful Api

- Testing
  - Supertest
  - Mocha and Chai 

- Database
  - postgreSQL
  - knex

- Production
  - Deployed via Heoku

## Document of API

### Authorization

- API requests protected endpoints requires the use of a bearer token. 
- To authenticate an API request, user should provide user's bearer token in the Authorization header.

### YOURMOON's Endpoint


#### Auth Endpoint

```http
POST  /api/users
```

|  Key         | Values               |
| :------------|----------------------|
|  `user_name` | string, required     |
|  `password`  | string, required     |


#### Users Endpoint

```http
POST  /api/users
```

|  Key         | Values               |
| :------------|----------------------|
|  `user_name` | string, required     |
|  `password`  | string, required     |
|  `full_name` | string, required     |


#### Category Endpoint

```http
GET  /api/category
```

Provides array of all categories object.

```http
GET  /api/category/:category_id
```

Provides specific category.


#### Item Endpoint

```http
GET  /api/item
```

Provides array of all items object.


```http
GET  /api/item/:item_id
```

Provides specific item object.

```http
GET  /api/item/:item_id/reviews
```

Provides all reviews for specific item.


#### Review Endpoint

```http
POST  /api/review
```

|  Key         | Values               |
| :------------|----------------------|
|   `item_id`  | number, required     |
|   `rating`   | number, required     |
|    `text`    | string, required     |

```http
GET  /api/review/review_id
```

Provides specific review object.

```http
DELETE  /api/review/review_id
```

Delete review matching id parameter.


#### Cart Endpoint

```http
GET  /api/user/cart
```

Provides array of user's cart object.

```http
POST  /api/user/cart
```

|  Key         | Values               |
| :------------|----------------------|
|   `item_id`  | number, required     |
|     `qty`    | number, required     |
|   `cart_id`  | number, required     |
|  `scent_id`  | number, required     |
|  `color_id`  | number, required     |

```http
DELETE  /api/user/cart
```

|  Key         | Values               |
| :------------|----------------------|
|`cart_item_id`| number, required     |