const mongoose = require('mongoose')


const shopSchema = mongoose.Schema({
    name :{type:String, maxlenth:200,required:true},
    shopkeeper:{type:mongoose.Types.ObjectId, required :true},
    address:String,
    phone_number:{},
    email_address:{},
    profile_picture:{},
    banner:{}
})
module.exports = mongoose.model('Shop',shopSchema)