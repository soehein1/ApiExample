const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const Product = require('../models/products')
//const connectDB = require('../dbconfig/dbconnection')


router.get('/products/:id', async(req, res) => {
    const product =await Product.findOne({_id:req.params.id})
    res.json(product)
});
router.get('/products', async (req, res) => {
    const products = await Product.find()
    res.json(products)
});
router.post('/products', async (req, res) => {
    const { name, price, type } = req.body
    if (!name || !price || !type) {
        res.json({ message: "product information missing" })
    }
    const product = new Product({name,price,type})
    await product.save()
    res.json(product)



});


router.put('/products/:id', (req, res) => {

    
});


router.delete('/products/:id', async (req, res) => {
    const product = await Product.deleteOne({_id:req.params.id})
    res.json({message:"deleted"})
})



module.exports = router;