const express = require('express');
const { loginUser, getUser, updateUser, signUp, confirmEmail,resetPassword, forgotPassword } = require('../controllers/userController')
const checkEmail = require('../foreignAPIs/middlewares/emailVerification')
const checkPhone = require('../foreignAPIs/middlewares/phoneNumberVerification')
const checkToken = require('../middlewares/auth/tokenValidation')
const isPasswordValid = require('../middlewares/passwordValidator')
const router = express.Router()

router.get('/me', checkToken, getUser);
router.post('/register',
    isPasswordValid,
    checkEmail,
    signUp);
router.put('/update_user', updateUser)
router.post('/login', loginUser)
router.put('/me',  updateUser);
router.get('/confirmemail', confirmEmail)
router.post('/forgot_pd',forgotPassword)
router.put('/reset_pd',resetPassword)
module.exports = router