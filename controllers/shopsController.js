const res = require('express/lib/response')
const mongoose = require('mongoose')
const url = require('url')
const Shop = require("../models/shopModel")

const getMyShop = (req, res) => {
    try {
        res.status(200).json({ message: "this is myshop route speaking:))" })
    } catch (error) {
        res.status(400).json({ message: "error in myshop route:((" })

    }
}

const getShops = async (req, res) => {
    try {
        const address = url.parse(req.protocol+"://"+req.hostname + req.originalUrl, true)
        const query = address.query
        if (query.id !== undefined && query.id !== null&& query !==undefined &&  mongoose.Types.ObjectId.isValid(query.id)) {
            const shop = await Shop.findOne({ _id: query.id })
            res.status(200).json(shop)
        }else{
            const shops = await Shop.find()
            res.status(200).json(shops)
        }


    } catch (error) {
        res.status(400).json({ message:'something went wrong' })
    }

}

/** name :{type:String, maxlenth:200,required:true},
    shopkeeper:{type:mongoose.Types.ObjectId},
    address:{},
    phone_number:{},
    email_address:{},
    profile_picture:{},
    banner:{} */
const createShop = async (req, res) => {
    try {
        const {name,shopkeeper,address,phone_number,email_address}=req.body
        const shop = new Shop({name,shopkeeper,address,phone_number,email_address })
        await shop.save()
        res.status(201).json({ message: "created myshop" })
    } catch (error) {
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