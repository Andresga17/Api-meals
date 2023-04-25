const express = require('express');

//IMPORTACION DE LOS CONTROLADORES
const userController = require('../controllers/user.controller');

//IMPORTACION DE LOS MIDDLEWARES
const validationMiddleware = require('./../middlewares/validation.middleware')

const router = express.Router();

router.route('/signup').post(validationMiddleware.createUserValidation, userController.createUser);
router.route('/login').post(validationMiddleware.loginUserValidation, userController.loginUser);

router.route('/orders').get(userController.getAllOrdersByUser);
router.route('/orders/:id').get(userController.getOrderById);

router
  .route('/:id')
  .patch(userController.UpdateUserProfile)
  .delete(userController.deleteUserProfile);

module.exports = router;
