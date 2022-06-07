const jwt = require('jsonwebtoken')
require('dotenv').config()


const checkToken = async (req, res, next) => {
    const header = req.headers['authorization'];
    if (header !== undefined) {
        const token = header.split(' ')[1];
        if (token !== undefined || token !== null) {
            jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
                
                if (err) {
                    res.status(400).json({ message: "login time out" })
                }
                else {
                    req.user = user;
                    next()
                }

            });
        }
        else {
            res.status(400).json({ message: "invalid token" })
        }
    } else {
        //If header is undefined return Forbidden (401)
        res.status(401).json({ message: "unauthorized" })
    }
}


module.exports = checkToken


