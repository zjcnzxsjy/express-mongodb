const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String
});

module.exports = {
    user: mongoose.model("users", userSchema)
}