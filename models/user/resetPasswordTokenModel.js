const mongoose = require('mongoose')
const resetPasswordTokenSchema= new mongoose.Schema({
    user:{type :mongoose.Types.ObjectId, ref :'User',required:true},
    token:{type:String,required:true},

},{timestamps:true})
module.exports=mongoose.model('resetPasswordToken',resetPasswordTokenSchema)