const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

//IMPORTACION DE LAS ROUTES
const userRouter = require('./routes/user.routes');
const restaurantRouter = require('./routes/restaurant.routes');
const mealRouter = require('./routes/meal.routes');
const orderRouter = require('./routes/order.routes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//SE CREA LA INSTANCIA DE LA APP
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//RUTAS
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

//ERROR PARA RUTAS INVALIDAS
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
