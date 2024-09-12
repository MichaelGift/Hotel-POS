const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservationSchema = new mongoose.Schema(
    {
        tables: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Table',
                required: [true, "Please select a table"]
            }
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        from: {
            type: Date,
            required: [true, "Please select starting time"]
        },
        to: {
            type: Date,
            required: [true, "Please select ending time"]
        }
    }
)

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;