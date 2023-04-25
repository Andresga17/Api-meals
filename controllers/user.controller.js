const AppError = require('../utils/appError');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    role,
  });

  res.status(201).json({
    status: 'succes',
    message: 'The user has been created successfully',
    user,
  });
});
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'enabled',
    },
  });

  if(!user) {
    return next(new AppError('The user could not be found', 404))
  }

});
exports.getAllOrdersByUser = catchAsync(async (req, res, next) => {});
exports.getOrderById = catchAsync(async (req, res, next) => {});
exports.UpdateUserProfile = catchAsync(async (req, res, next) => {});
exports.deleteUserProfile = catchAsync(async (req, res, next) => {});
