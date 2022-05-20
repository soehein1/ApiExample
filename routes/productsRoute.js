const express = require('express');
const router = express.Router()
const Product = require('../models/productModel')
const  { getProducts,postProduct,deleteProduct}= require( '../controllers/productsController')


router.get('/products' , getProducts);
router.post('/product', postProduct);
router.put('/products/:id', (req, res) => {  });
router.delete('/products',deleteProduct)



module.exports = router;