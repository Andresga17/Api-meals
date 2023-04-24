const express = require('express');

const orderController = require('../controllers/order.controller');

const router = express.Router();

router.route('/').post(orderController.createOrder);

router.route('/me').post(orderController.getAllMyOrders);

router
  .route('/:id')
  .patch(orderController.updateOrderComplete)
  .delete(orderController.cancellOrder);

module.exports = router;
