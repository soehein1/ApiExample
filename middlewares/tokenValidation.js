const jwt = require('jsonwebtoken')


const checkToken = (req, res, next) => {
    console.log("in token now")
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const token = header.split(' ')[1];
        if (token) {
            req.token = token;
            return next();
        }
        else{
            return res.status(400).json({message:"invalid token"})
        }
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403).json({message:"access denied"})
    }
}
module.exports = checkToken