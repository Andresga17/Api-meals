const generateJWT = require('./../utils/jwt');
const AppError = require('../utils/appError');
const User = require('./../models/user.model');
const catchAsync = require('./../utils/catchAsync');
const bcrypt = require('bcryptjs');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'succes',
    message: 'The user has been created successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
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

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
exports.getAllOrdersByUser = catchAsync(async (req, res, next) => {});
exports.getOrderById = catchAsync(async (req, res, next) => {});
exports.UpdateUserProfile = catchAsync(async (req, res, next) => {});
exports.deleteUserProfile = catchAsync(async (req, res, next) => {});
