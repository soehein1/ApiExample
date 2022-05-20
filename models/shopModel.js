const mongoose = require('mongoose')


const shopSchema = mongoose.Schema({
    name :{type:String, maxlenth:200,required:true},
    shopkeeper:{},
    address:{},
    phone_number:{},
    email_address:{},
    profile_picture:{},
    banner:{}
})
module.exports = mongoose.model('Shop',shopSchema)