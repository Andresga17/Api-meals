const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.userFromReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const user = await User.findOne({
    where: {
      id: review.userId,
      status: 'enabled',
    },
  });

  if (!user) {
    return next(new AppError('user not found', 404));
  }

  req.user = user;
  next();
});
