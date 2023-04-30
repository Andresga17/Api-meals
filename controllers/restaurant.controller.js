const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
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
    include: [
      {
        model: Review,
      },
    ],
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
exports.deleteRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'inactive' });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been deleted',
    restaurant,
  });
});
exports.createReview = async (req, res) => {
  const { sessionUser } = req;
  const { comment, rating } = req.body;
  const { id } = req.params;

  const review = await Review.create({
    rating,
    comment,
    restaurantId: id,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'succes',
    message: 'The review has been created',
    review: {
      id: review.id,
      userId: sessionUser.id,
      comment: review.comment,
      restaurantId: review.restaurantId,
      rating: review.rating,
    },
  });
};
exports.updateARestaurantReview = async (req, res) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({
    status: 'success',
    message: 'The review has been updated',
    review,
  });
};
exports.deleteARestaurantReview = async (req, res) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'The review has been updated',
    review,
  });
};
