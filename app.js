const express = require('express');
const cors = require('cors');

//IMPORTACION DE LAS ROUTES
const userRouter = require('./routes/user.routes');
const restaurantRouter = require('./routes/restaurant.routes');
const mealRouter = require('./routes/meal.routes');
const orderRouter = require('./routes/order.routes');

//SE CREA LA INSTANCIA DE LA APP
const app = express();
app.use(express.json());
app.use(cors());

//RUTAS
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

module.exports = app;
