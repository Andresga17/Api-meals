const express = require('express');

//IMPORTACION DE LOS CONTROLADORES
const orderController = require('../controllers/order.controller');

//IMPORTACION DE LOS MIDDLEWARES
const newOrderMiddleware = require('./../middlewares/newOrder.middleware')
const authMiddleware = require('./../middlewares/auth.middleware')

const router = express.Router();

router.use(authMiddleware.protect)

router.route('/').post(newOrderMiddleware.validMealFromOrder, orderController.createOrder);

router.route('/me').get(orderController.getAllMyOrders);

router
  .route('/:id')
  .patch(orderController.updateOrderComplete)
  .delete(orderController.cancellOrder);

module.exports = router;
