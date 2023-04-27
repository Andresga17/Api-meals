const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: 'success',
    message: 'The meal has been created',
    meal: {
      name: meal.name,
      price: meal.price,
      restaurantId: meal.restaurantId,
    },
  });
});
exports.getAllMeals = catchAsync(async (req, res) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});
exports.getMealById = catchAsync(async (req, res) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    meal,
  });
});
exports.updateMeal = catchAsync(async (req, res) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    meal,
  });
});
exports.deleteMeal = catchAsync(async (req, res) => {
  const { meal } = req;

  await meal.update({ status: 'inactive' });
  res.status(200).json({
    status: 'success',
    message: 'the meal has been deleted',
    meal,
  });
});
