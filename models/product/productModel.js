const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type:String, required:true},
    images:{type:Array },
    shop:{type :mongoose.Types.ObjectId ,ref:'User'},
    type:String,
    category:{type:String , required:true},
    price:{type:String , required:true},
    
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