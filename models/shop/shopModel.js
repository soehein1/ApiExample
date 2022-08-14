const mongoose = require('mongoose')


const shopSchema = mongoose.Schema({
    name :{type:String, maxlenth:200,default:"Unknown"},
    shopkeeper:{type:mongoose.Types.ObjectId, required :true},
    address:{},
    phone:{type:String, required:true},
    email:{type:String, required:true},
    profile_picture:{type:String,default:''},
    banner:{type:String,default:''},
    varified:{type:Boolean,default:false}
})

module.exports = mongoose.model('Shop',shopSchema)