const express = require('express');
const { loginUser, getUser, updateUser, signUp, confirmEmail } = require('../controllers/userController')
const checkEmail = require('../middlewares/emailVerification')
const checkPhone = require('../middlewares/phoneNumberVerification')
const checkToken = require('../middlewares/tokenValidation')
const isPasswordValid = require('../middlewares/passwordValidator')
const router = express.Router()
const path = require('path')
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../upload/profile_pics/") )
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =  '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
})
const upload = multer({ storage: storage })


router.get('/me', checkToken, getUser);
router.post('/register',
    upload.single('avatar'),
    checkEmail,
    checkPhone,
    isPasswordValid,
    signUp);

router.post('/login', loginUser)
router.put('/me', updateUser);
router.get('/confirmemail', confirmEmail)

module.exports = router