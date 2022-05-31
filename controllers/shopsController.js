const mongoose = require('mongoose')
const url = require('url')
const Shop = require("../models/shopModel")




const getMyShop = async (req, res) => {
    try {
        const user = req.user
        if (user && user.role === 'shopkeeper') {
            const shop = await Shop.findOne({ shopkeeper: user.sub })
            res.status(200).json(shop)
        } else {
            res.status(404).json({ message: "access denied" })
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: "error in myshop route:((" })

    }
}

const getShops = async (req, res) => {
    try {
        const address = url.parse(req.protocol + "://" + req.hostname + req.originalUrl, true)
        const query = address.query
        if (query.id !== undefined && query.id !== null && query !== undefined && mongoose.Types.ObjectId.isValid(query.id)) {
            const shop = await Shop.findOne({ _id: query.id })
            res.status(200).json(shop)
        } else {
            const shops = await Shop.find()
            res.status(200).json(shops)
        }


    } catch (error) {
        res.status(400).json({ message: 'something went wrong' })
    }

}


const createShop = async (req, res) => {
    try {
        const user = req.user
        const { name, address, phone_number, email_address } = req.body
        const oldShop = await Shop.findOne({ email_address })
        if (!oldShop) {
            const shop = new Shop({ name, shopkeeper: user.sub, address, phone_number, email_address })
            await shop.save()
            res.status(201).json({ message: "created myshop" })
        }else{
            res.status(401).json({message:"shop already exists"})
        }

    } catch (error) {
        console.log(error.message)
        res.status(200).json({ message: "error in myshop route" })
    }
}


const updateShop = (req, res) => {
    try {
        res.status(202).json({ message: "myshop successfully updated:))" })
    } catch (error) {
        res.status(400).json({ message: "error occurred while updating:((" })
    }
}


module.exports = {
    getShops,
    getMyShop,
    createShop,
    updateShop
}