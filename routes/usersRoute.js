const express = require('express');
const { loginUser, getUser, updateUser, signUp, confirmEmail } = require('../controllers/userController')
const checkEmail = require('../foreignAPIs/middlewares/emailVerification')
const checkPhone = require('../foreignAPIs/middlewares/phoneNumberVerification')
const checkToken = require('../middlewares/tokenValidation')
const isPasswordValid = require('../middlewares/passwordValidator')
const router = express.Router()
const {  uploadProfilePicture } = require('../middlewares/storage')

router.get('/me', checkToken, getUser);
router.post('/register',
    uploadProfilePicture,
    isPasswordValid,
    checkEmail,
    
    signUp);

router.post('/login', loginUser)
router.put('/me', checkToken, updateUser);
router.get('/confirmemail', confirmEmail)

module.exports = router