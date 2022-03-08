const mongoose = require('mongoose')

const tokenSchema= new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    status:{type:String, default:'pending'},
    token:{type:String,required:true}
},{timestamps:true})
module.exports = mongoose.model('Token',tokenSchema)