const axios = require('axios')


const verifyPhoneNumber=async(req,res,next)=>{

    /*axios.get('https://phonevalidation.abstractapi.com/v1/?api_key='+process.env.PHONE_NUM_CHECK_API_KEY+'&phone=+8801302095716').then(response=>{
        console.log(response.data)
        next()
    })*/
    next()
   
}
module.exports = verifyPhoneNumber