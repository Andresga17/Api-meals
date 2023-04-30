const express = require('express');

//IMPORTACION DE LOS CONTROLADORES
const orderController = require('../controllers/order.controller');

//IMPORTACION DE LOS MIDDLEWARES
const newOrderMiddleware = require('./../middlewares/newOrder.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const orderMiddleware = require('./../middlewares/order.middleware');
const userFromOrderMiddleware = require('../middlewares/userFromOrder.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .post(newOrderMiddleware.validMealFromOrder, orderController.createOrder);

router.route('/me').get(orderController.getAllMyOrders);

router
  .route('/:id')
  .patch(
    orderMiddleware.validIfOrderExist,
    userFromOrderMiddleware.userFromOrder,
    authMiddleware.protectAccountOwner,
    orderController.updateOrderComplete
  )
  .delete(
    orderMiddleware.validIfOrderExist,
    userFromOrderMiddleware.userFromOrder,
    authMiddleware.protectAccountOwner,
    orderController.cancellOrder
  );

module.exports = router;
