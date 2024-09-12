const mongoose = require('mongoose');
const {Schema} = mongoose;

const DishSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter dish name"],
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },

        ingredients: [
            {
                ingredient: {
                    type: Schema.Types.ObjectId,
                    ref: 'Ingredient',
                    required: true,
                },
                quantityRequired: {
                    type: Number,
                    required: true,
                    default: 0,
                }
            },
        ]
    }
);

const Dish = mongoose.model('Dish', DishSchema);
module.exports = Dish;