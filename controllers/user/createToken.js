
const bcrypt = require('bcrypt')
const emailToken = require('../../models/user/emailTokenModel')

const createToken = (user)=>{
    const token = new emailToken({
        user:user._id,
        token:bcrypt.genSaltSync(5)
    })
    return token;
}

const isTokenExists = async (user)=>{
    const token = await emailToken.findOne({user:user._id})
    if(token){
        return true
    }else{
        return false
    }
}

module.exports = {createToken, isTokenExists}