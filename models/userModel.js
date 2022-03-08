const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: String,
    phone:{type:String,required:true},
    email:String,
    password:String,
    status:{type:String,default:'pending'}

},{timestamps:true});
module.exports = mongoose.model('User',userSchema)