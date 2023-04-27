const Meal = require('../models/meal.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validMealFromOrder = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const mealFromOrder = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!mealFromOrder) {
    return next(new AppError(`The meal with id ${id} is not available`));
  }

  req.mealFromOrder = mealFromOrder;
  next();
});
