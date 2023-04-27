const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .notEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage('password cannot be empty')
    .withMessage('password must be at least 8 characters and maximum 20'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password').notEmpty().withMessage('password cannot be empty'),
  validFields,
];

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('address').notEmpty().withMessage('address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('please type a rating')
    .isNumeric({ no_symbols: true }),
  validFields,
];

exports.createMealValidation = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('price cannot be empty')
    .isNumeric({ no_symbols: true }),
  validFields,
];
