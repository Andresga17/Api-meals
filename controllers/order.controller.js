const Order = require('../models/order.model');
const User = require('../models/user.model');

exports.createOrder = async (req, res) => {
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
};
exports.getAllMyOrders = async (req, res) => {};
exports.updateOrderComplete = async (req, res) => {};
exports.cancellOrder = async (req, res) => {};
