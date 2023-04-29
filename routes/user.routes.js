const express = require('express');

//IMPORTACION DE LOS CONTROLADORES
const userController = require('../controllers/user.controller');

//IMPORTACION DE LOS MIDDLEWARES
const userMiddleware = require('./../middlewares/user.middleware');
const validationMiddleware = require('./../middlewares/validation.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/signup')
  .post(validationMiddleware.createUserValidation, userController.createUser);
router
  .route('/login')
  .post(validationMiddleware.loginUserValidation, userController.loginUser);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .patch(
    userMiddleware.validIfUserExist,
    authMiddleware.protectAccountOwner,
    userController.UpdateUserProfile
  )
  .delete(
    userMiddleware.validIfUserExist,
    authMiddleware.protectAccountOwner,
    userController.deleteUserProfile
  );

  router.route('/orders').get(userController.getAllOrdersByUser);
  router.route('/orders/:id').get(userController.getOrderById);

module.exports = router;
