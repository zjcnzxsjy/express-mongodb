const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    birthday: String,
    name: String,
    city: String,
    education: String,
    age:  Number
});
module.exports = {
    table: mongoose.model("table", tableSchema)
}