const mongoose = require('mongoose');

const candySchema = new mongoose.Schema({
    candyName: { type: String , required: true , unique : true },
    price: { type: String , required: true },
    image: { type: String },
});

module.exports = mongoose.model('Candy' , candySchema);