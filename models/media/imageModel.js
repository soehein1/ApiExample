const mongoose = require('mongoose')


const imageSchema = new mongoose.Schema({
    filename :{type:String},
    url:{type:String,required:true},
    type:{type:String},
    owner:{type:mongoose.Types.ObjectId},
    size:{type:Number}
})
module.exports = mongoose.model('Image',imageSchema)