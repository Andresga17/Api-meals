const express = require('express');

//IMPORTACION DE CONTROLADORES
const mealController = require('../controllers/meal.controller');

//IMPORTACION DE MIDDLEWARES
const authMiddleware = require('../middlewares/auth.middleware')
const validationMiddleware = require('../middlewares/validation.middleware')
const mealMiddleware = require('../middlewares/meal.middleware')

const router = express.Router();

router.route('/').get(mealController.getAllMeals);

router
  .route('/:id')
  .post(mealController.createMeal)
  .get(mealMiddleware.validIfMealExist, mealController.getMealById)
  .patch(mealMiddleware.validIfMealExist, mealController.updateMeal)
  .delete(mealMiddleware.validIfMealExist, mealController.deleteMeal);

module.exports = router;
