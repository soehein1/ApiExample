const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    full_name: { type: String, maxlength: 100, required: true },
    role: { type: String, required: true , maxlength:20 },
    profile_picture: {type:String},
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'pending' },
    address: {
        state: { type: String, maxlength: 20 },
        city: { type: String, maxlength: 20 },
        village: { type: String, maxlength: 30 }
    }

}, { timestamps: true });
module.exports = mongoose.model('User', userSchema)