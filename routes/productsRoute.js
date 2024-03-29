const express = require('express');
const router = express.Router()
const { getProducts, postProduct, deleteProduct, updateProduct } = require('../controllers/productsController')
const checkToken = require('../middlewares/auth/tokenValidation')
const { uploadProfilePicture } = require('../middlewares/storage')

router.get('/products', getProducts);
router.post('/product', checkToken, postProduct);
router.put('/products',checkToken, updateProduct);
router.delete('/products', deleteProduct)



module.exports = router;