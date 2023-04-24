const express = require('express');

//IMPORTACION DE LOS CONTROLADORES
const restaurantController = require('../controllers/restaurant.controller');

const router = express.Router();

router
  .route('/')
  .post(restaurantController.createRestaurant)
  .get(restaurantController.getAllRestaurants);

router
  .route('/:id')
  .get(restaurantController.getRestaurantById)
  .patch(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);

router.route('/reviews/:id').post(restaurantController.createReview);

router
  .route('/reviews/:restaurantId/:id')
  .patch(restaurantController.updateARestaurantReview)
  .delete(restaurantController.deleteARestaurantReview);

module.exports = router;
