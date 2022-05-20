const { route } = require('./usersRoute')
const { getShops, getMyShop, createShop, updateShop } = require('../controllers/shopsController')
const router = require('express').Router()


router.get('/', getShops)
router.post('/', createShop)
router.get('/me', getMyShop)
router.patch('/me', updateShop)


module.exports = router