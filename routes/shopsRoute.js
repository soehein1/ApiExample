const { route } = require('./usersRoute')
const { getShops, getMyShop, createShop, updateShop } = require('../controllers/shopsController')
const checkToken = require('../middlewares/auth/tokenValidation')
const router = require('express').Router()


router.get('/', getShops)
router.post('/',checkToken, createShop)
router.get('/me', checkToken, getMyShop)
router.patch('/me',checkToken, updateShop)


module.exports = router