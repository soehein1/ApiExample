const express = require('express')
require('dotenv').config()
const productsRoute = require('./routes/productsRoute')
const odersRoute = require('./routes/ordersRoute')
const userRoute = require('./routes/usersRoute')
const shopsRoute = require('./routes/shopsRoute')
const connectDB = require('./dbconfig/dbconnection')
const checkToken = require('./middlewares/auth/tokenValidation')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({origin:true,credentials:true}));
app.get('/', (req, res) => {
    console.log('why am i not able to connect to db')
    res.send("Hey Hellokkkkkk");
});
app.use('/api', productsRoute);
app.use('/api/oders', odersRoute);
app.use('/api/user', userRoute);
app.use('/api/shops', shopsRoute)
/////serving static files
app.use('/api/images', express.static('./upload'))


app.listen(process.env.PORT, () => {
    connectDB()
    console.log('server runnnning.....')
})
