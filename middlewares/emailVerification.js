const axios = require('axios')

const verifyEmail =async (req, res, next) => {
    const email = req.body.email
    if (!email) {
        res.status(400).json({ message: 'no email address is provided' })
    }
    axios.get('https://emailvalidation.abstractapi.com/v1/?api_key=' + process.env.EMAIL_CHECK_API_KEY + '&email=' + email).then(response => {
        //console.log(response.data)
        if (response.data.deliverability === 'DELIVERABLE'){
            return next()
        }else{
            return res.status(400).json({message:'email invalid'})
        }
            
    }).catch(error => {
        
    });
}
module.exports = verifyEmail