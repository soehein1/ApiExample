const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: String,
    email:String,
    paswd:String,
    status:String

});
module.exports = mongoose.model('User',userSchema)