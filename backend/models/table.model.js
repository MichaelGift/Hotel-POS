const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a table name"],
        },
        seats: [
            {
                seat_number: {
                    type: Number,
                    required: true
                },
                occupied: {
                    type: Boolean,
                    default: true
                },
            }
        ]
    }
)

const Table = mongoose.model('Table', TableSchema);
module.exports = Table;