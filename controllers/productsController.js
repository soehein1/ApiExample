const Product = require('../models/productModel')
const url = require('url')


const getProducts = async (req, res) => {
    try {
        const address = url.parse(req.protocol + req.hostname + req.originalUrl, true)
        const query = address.query
        if (query.id !== undefined) {
            const product = await Product.findOne({ _id: query.id })
            res.status(200).json(product)
        }
        else if (query.type !== undefined) {
            const products = await Product.findOne({ type: query.type })
            res.status(200).json(products)
        } else {
            const products = await Product.find()
            res.status(200).json(products)
        }

    } catch {
        res.status(404).json({ message: "Error Occured" })
    }


}

const postProduct = async (req, res) => {
    //verification logic here



    //logic for extracting information from request
    const { name, price, type, shop } = req.body
    const product = new Product({ name, price, type, shop })
    console.log(product)
    await product.save()
    res.status(200).json(product)
}
const deleteProduct = async (req, res) => {
    try {
        const address = url.parse(req.protocol + req.hostname + req.originalUrl, true)// passing true will parse query part as well
        const query = address.query
        if (query.id !== undefined) {
            const product = await Product.deleteOne({ _id: query.id })
            console.log(query.id+" product is deleted.")
            res.status(201).json(product)
        } else {
            res.status(404).json({ message: "such file doesn't exist" })
        }
    } catch (error) {
        res.json({ message: error.message })

    }



}
const updateProduct = () => {
    //logic for Updating product here
    res.status(200)
}
module.exports = {
    getProducts,
    postProduct,
    deleteProduct
}