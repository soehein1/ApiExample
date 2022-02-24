const express = require('express')
require('dotenv').config()
const productsRoute = require('./routes/productsRoute')
const odersRoute = require('./routes/ordersRoute')
const userRoute = require('./routes/usersRoute')
const connectDB = require('./dbconfig/dbconnection')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
connectDB()
app.get('/', (req, res) => {
    res.send("Hey Hello"+req);
});


app.use('/api', productsRoute);
app.use('/api', odersRoute);
app.use('/api', userRoute);
app.listen(process.env.PORT, () => {
    console.log('runnnning')
})
