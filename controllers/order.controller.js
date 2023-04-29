const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');

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
      userId: sessionUser.id,
    },
    
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.updateOrderComplete = catchAsync(async (req, res) => {
  const { order } = req;

  
  await order.update({ status: 'completed' });

    res.status(200).json({
    status: 'success',
    message: 'The order has been updated',
    order,
  });
});

exports.cancellOrder = catchAsync(async (req, res) => {
  const { order } = req

  await order.update ({status: 'cancelled'})

  res.status(200).json({
    status: 'success',
    message: 'the post has been deleted',
    order
  })
});
