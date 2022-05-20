const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    images:{type:Array},
    shop:{type :mongoose.Types.ObjectId},
    category:String,
    price:String,
    type:String,
    likes:{type:Number,default:0},
    reviews:{type:Number,default:0},

});
module.exports = mongoose.model('Product',productSchema)

/**Product Name
Product Images
SKUs
Retail Price & Cost Price
BARCODE:  (ISBN, UPC, GTIN, etc.)
Weight
Category
Brand
Product Type 
Variants 
Custom Attributes
SEO Fields */