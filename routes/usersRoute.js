const express = require('express');
const { loginUser, getUser, updateUser, signUp, confirmEmail } = require('../controllers/userController')
const checkEmail = require('../middlewares/emailVerification')
const checkPhone = require('../middlewares/phoneNumberVerification')
const checkToken = require('../middlewares/tokenValidation')
const isPasswordValid = require('../middlewares/passwordValidator')
const router = express.Router()
const {storage,uploadProfilePicture} = require('../middlewares/storage')
const multer = require("multer")



router.get('/me', checkToken, getUser);
router.post('/register',
    uploadProfilePicture,
    isPasswordValid,
    signUp);

router.post('/login', loginUser)
router.put('/me', checkToken, updateUser);
router.get('/confirmemail', confirmEmail)

module.exports = router