const Review = require('../models/review.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfReviewExist = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
      restaurantId: restaurantId,
    },
  });

  if (!review) {
    return next(new AppError('Review not found', 404));
  }
  req.review = review;
  next();
});
