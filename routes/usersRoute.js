const express = require('express');
const { loginUser, getUser, updateUser, signUp, confirmEmail } = require('../controllers/userController')
const checkEmail = require('../middlewares/emailVerification')
const checkPhone = require('../middlewares/phoneNumberVerification')
const checkToken = require('../middlewares/auth')
const isPasswordValid = require('../middlewares/passwordValidator')
const router = express.Router()

router.get('/me', checkToken, getUser);
router.post('/register',
    checkEmail,
    checkPhone,
    isPasswordValid,
    signUp);

router.post('/login', loginUser)
router.put('/me', updateUser);
router.get('/confirmemail',confirmEmail)

module.exports = router