const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.userFromOrder= catchAsync(async (req, res, next) => {
  const { order } = req;

  const user = await User.findOne({
    where: {
      id: order.userId,
      status: 'enabled',
    },
  });
  if (!user) {
      return next(new AppError('user not found', 404));
  }
  
  req.user = user;
  next();
});
