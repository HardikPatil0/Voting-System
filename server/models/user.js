const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
        role: {
        type: String,
        default: "user" // optional: default role
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
