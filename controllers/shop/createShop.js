const  Shop  = require('../../models/shop/shopModel')

const createShop = async (user) => {
    const { email, phone, address } = user
    const shopkeeper = user._id
     const shop = new Shop({email,phone,address,shopkeeper})
     const shp = shop.save()
    return shp
}
module.exports = createShop