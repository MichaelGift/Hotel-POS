const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter ingredient name"],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;