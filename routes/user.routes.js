const express = require('express');

//IMPORTACION DE LOS CONTROLADORES
const userController = require('../controllers/user.controller');

//IMPORTACION DE LOS MIDDLEWARES
const validationMiddleware = require('./../middlewares/validation.middleware')
const userMiddleware = require('./../middlewares/user.middleware')

const router = express.Router();

router.route('/signup').post(validationMiddleware.createUserValidation, userController.createUser);
router.route('/login').post(validationMiddleware.loginUserValidation, userController.loginUser);

router.route('/orders').get(userController.getAllOrdersByUser);
router.route('/orders/:id').get(userController.getOrderById);

router
  .route('/:id')
  .patch(userMiddleware.validIfUserExist, userController.UpdateUserProfile)
  .delete(userMiddleware.validIfUserExist, userController.deleteUserProfile);

module.exports = router;
