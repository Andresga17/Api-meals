const Review = require('../models/review.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfReviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError('Review not found', 404));
  }
  req.review = review;
  next();
});
