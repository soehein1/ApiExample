const mongoose = require('mongoose')
const resetPasswordTokenSchema= new mongoose.Schema({
    user:{type :String, required:true},
    token:{type:String,required:true},
    createdAt:{type:Date,expires:300,default:Date.now}

})
module.exports=mongoose.model('ResetPasswordToken',resetPasswordTokenSchema)