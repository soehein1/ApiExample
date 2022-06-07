const mongoose = require('mongoose')


const connectDB = async () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("successfully connected to database")
    })
}
module.exports=connectDB