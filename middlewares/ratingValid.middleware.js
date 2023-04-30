const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.ratinValidation = catchAsync(async (req, res, next) => {
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return next(new AppError('Rating must be a number bewtwen 1 and 5'));
  }

  next();
});
