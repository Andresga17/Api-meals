const express = require('express');

//IMPORTACION DE LOS CONTROLADORES
const restaurantController = require('../controllers/restaurant.controller');

//IMPORTACION DE LOS MIDDLEWARES
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const validationsMiddleware = require('./../middlewares/validation.middleware');
const reviewMiddleware = require('./../middlewares/review.middleware');
const userFromReviewMiddleware = require('./../middlewares/userFromReview.middleware');
const validRatingMiddleware = require('./../middlewares/ratingValid.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    authMiddleware.protect,
    validationsMiddleware.createRestaurantValidation,
    validRatingMiddleware.ratinValidation,
    restaurantController.createRestaurant
  )
  .get(restaurantController.getAllRestaurants);

router
  .route('/:id')
  .get(
    restaurantMiddleware.validIfRestExist,
    restaurantController.getRestaurantById
  )

  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantMiddleware.validIfRestExist,
    restaurantController.updateRestaurant
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantMiddleware.validIfRestExist,
    restaurantController.deleteRestaurant
  );

router
  .route('/reviews/:id')
  .post(
    authMiddleware.protect,
    validRatingMiddleware.ratinValidation,
    restaurantController.createReview
  );

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    authMiddleware.protect,
    reviewMiddleware.validIfReviewExist,
    userFromReviewMiddleware.userFromReview,
    authMiddleware.protectAccountOwner,
    authMiddleware.restrictTo('admin'),
    restaurantController.updateARestaurantReview
  )
  .delete(
    authMiddleware.protect,
    reviewMiddleware.validIfReviewExist,
    userFromReviewMiddleware.userFromReview,
    authMiddleware.protectAccountOwner,
    authMiddleware.restrictTo('admin'),
    restaurantController.deleteARestaurantReview
  );

module.exports = router;
