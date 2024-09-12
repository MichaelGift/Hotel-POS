const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        middle_name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phone_number: {
            type: String, require: true
        }
    }
)

const User = mongoose.model('User', UserSchema);
module.exports = User;