const express = require('express');

const mealController = require('../controllers/meal.controller');

const router = express.Router();

router.route('/').get(mealController.getAllMeals);

router
  .route('/:id')
  .post(mealController.createMeal)
  .get(mealController.getMealById)
  .patch(mealController.updateMeal)
  .delete(mealController.deleteMeal);

module.exports = router;
