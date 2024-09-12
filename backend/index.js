const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const ingredientRoute = require('./routes/ingredient.routes');
const dishRoute = require('./routes/dish.routes');
const orderRoute = require('./routes/order.routes');
const tableRoute = require('./routes/table.routes');
const reservationRoute = require('./routes/reservation.routes');
const userRouter = require('./routes/user.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/ingredients', ingredientRoute);
app.use('/api/dishes', dishRoute);
app.use('/api/orders', orderRoute);
app.use('/api/tables', tableRoute);
app.use('/api/reservations', reservationRoute);
app.use('/api/users', userRouter);


mongoose.connect(`${process.env.MONGODB_URI}`,)
    .then(() => {
        console.log("Connected to database!")
        app.listen(3000, () => {
            console.log("Server running on port 3000")
        });
    })
    .catch((error) => {
        console.trace(error)
    });

app.get('/', (req, res) => {
    res.send({'message': 'Hello World!'})
});