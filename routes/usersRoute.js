const express = require('express');
const { getUser, postUser, updateUser } = require('../controllers/userController')
const router = express.Router()



router.get('/me', getUser);
router.post('/register', postUser);
router.put('/:id', updateUser);


module.exports = router