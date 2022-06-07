const jwt = require('jsonwebtoken')
require('dotenv').config()


const generateAccessToken = (user)=>{
    return jwt.sign({
        sub:user._id,email:user.email,
        role:user.role,status:user.status},
        process.env.TOKEN_KEY,{expiresIn:'3hr'});
}
module.exports = {generateAccessToken}