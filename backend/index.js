const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(`${process.env.MONGODB_URI}`, )
    .then(() => {
        console.log("Connected to database!")
        app.listen(3000, () => {
            console.log("Server running on port 3000")
        });
    })
    .catch((error) => {
        console.trace(error)
    });