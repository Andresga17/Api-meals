const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'The Restaurant has been created',
    restaurant: {
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});
exports.getAllRestaurants = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    restaurants,
  });
});
exports.getRestaurantById = catchAsync(async (req, res) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});
exports.updateRestaurant = catchAsync(async (req, res) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({ status: 'inactive'})

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been deleted',
    restaurant,
  });
});
exports.createReview = async (req, res) => {};
exports.updateARestaurantReview = async (req, res) => {};
exports.deleteARestaurantReview = async (req, res) => {};
