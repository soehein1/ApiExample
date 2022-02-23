const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    price:String,
    type:String

});
module.exports = mongoose.model('Product',productSchema)