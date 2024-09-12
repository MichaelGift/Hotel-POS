const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new mongoose.Schema(
    {
        bill: {
            type: Number,
            required: false,
            default: 0
        },

        orderComplete: {
            type: Boolean,
            required: false,
            default: false
        },

        dishes: [
            {
                dish: {
                    type: Schema.Types.ObjectId,
                    ref: 'Dish',
                    required: false
                },

                quantityRequired: {
                    type: Number,
                    required: false,
                    default: 1
                },

                orderComplete: {
                    type: Boolean,
                    required: false,
                    default: false
                }
            },
        ],

        table: {
            type: Schema.Types.ObjectId,
            ref: 'Table',
            required: false
        }
    }, {
        timestamps: true
    }
)

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;