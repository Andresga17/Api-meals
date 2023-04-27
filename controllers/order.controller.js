const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');
// const User = require('../models/user.model');

exports.createOrder = catchAsync(async (req, res) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const { price } = req.mealFromOrder;

  const totalPrice = (await price) * quantity;

  const order = await Order.create({
    quantity,
    mealId,
    totalPrice,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'The order has been created',
    order: {
      quantity: order.quantity,
      mealId: order.mealId,
      totalPrice: order.totalPrice,
      userId: order.userId,
    },
  });
});
exports.getAllMyOrders = catchAsync(async (req, res) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: 8,
    },
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});
exports.updateOrderComplete = async (req, res) => {};
exports.cancellOrder = async (req, res) => {};
