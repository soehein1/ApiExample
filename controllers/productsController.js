const Product = require('../models/product/productModel')
const url = require('url')
const mongoose = require('mongoose')


const getProducts = async (req, res) => {
    try {
        const address = url.parse(req.protocol + req.hostname + req.originalUrl, true)
        const query = address.query
        if (query.id !== undefined && mongoose.Types.ObjectId.isValid(query.id)) {
            const product = await Product.findOne({ _id: query.id })
            console.log("going well bro :))")
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


const getCategories = (req, res) => {
    //return categories
    res.status(200).json({ message: "get Categories route" })
}

const postProduct = async (req, res) => {
    //verification logic here
    try {
        if (req.user.role !== 'shopkeeper' || req.user.status !== "verified") {
            res.status(400).json({ message: 'access denied' })
        } else {
            //logic for extracting information from request
            const { name, price, type, category } = req.body
            const product = new Product({ name, price, type, category, shop: req.user.sub })
            await product.save()
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(400).json({ error: "something went wrong" })
    }




}


const deleteProduct = async (req, res) => {
    try {
        const address = url.parse(req.protocol + req.hostname + req.originalUrl, true)// passing true will parse query part as well
        const query = address.query
        if (query.id !== undefined) {
            const product = await Product.deleteOne({ _id: query.id })
            console.log(query.id + " product is deleted.")
            res.status(201).json(product)
        } else {
            res.status(404).json({ message: "such file doesn't exist" })
        }
    } catch (error) {
        res.json({ message: error.message })

    }



}


const updateProduct = async (req, res) => {
    //logic for Updating product here
    try {
        const address = url.parse(req.protocol + "://" + req.hostname + req.originalUrl, true)// passing true will parse query part as well
        const query = address.query
        const { name, price, type } = req.body
        const user = req.user
        if (query.id !== undefined && mongoose.Types.ObjectId.isValid(query.id) && user.role === 'shopkeeper') {
            const product = await Product.findOne({ _id: query.id })
            if (user.sub == product.shop && product) {
                // Update the product now>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                await Product.updateOne({_id:query.id},{
                    name:name?name:product.name,
                    price:price?price:product.price,
                    type:type?type:product.type
                })

                res.status(201).json({ product })
            } 
            else {
                res.status(401).json({ message: 'no permission' })
            }
        } 
        else {
            res.status(401).json({ message: "access denied" })
        }
    } catch (error) {

    }


}
module.exports = {
    getProducts,
    postProduct,
    deleteProduct,
    updateProduct
}