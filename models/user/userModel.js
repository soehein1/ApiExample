const mongoose = require('mongoose')
//const Address = require('./addressModel')


const addressSchema = new mongoose.Schema({
    state: { type: String, maxlength: 100, default: "", },
    town: { type: String, maxlength: 100, default: "", },
    village_or_ward: { type: String, maxlength: 100, default: "" },
    home_number: { type: String }
}, { _id: false });


const userSchema = new mongoose.Schema({
    full_name: { type: String, maxlength: 100, required: true },
    role: { type: String, required: true, maxlength: 20 },
    profile_picture: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'pending' },
    address: { type: addressSchema, default: {} }

}, { timestamps: true });


const Address = mongoose.model("Address", addressSchema)
const User = mongoose.model("User", userSchema)
module.exports = { User, Address }
