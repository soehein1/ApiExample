const User = require('../../models/user/userModel')
const hashPassword = require('./hashPassword')
require('dotenv').config()


const createUser = (req)=>{
    const {full_name, phone ,role, email , password} = req.body
    if(!(full_name||email||role|| password)){
        return {}
    }
   
    if(role === 'shopkeeper' || role === 'customer' ){
        const user = new User({
            full_name,
            role,
            profile_picture: req.file?process.env.PROFILE_PICTURE_URL+req.file.filename:"",
            phone,
            email,
            password:hashPassword(password)
        })
        return user
    }
    return {};
    
}
const userExists= async(email)=>{
    const user =await User.findOne({email:email})
    if(user){
        return true
    }else{
        return false
    }
}
module.exports ={createUser , userExists}