require('dotenv').config();


const express = require('express');
const app = express();
module.exports = app;
const jwt = require('jsonwebtoken')

//routes ---------------------//
const paymentDetails = require('./paymentDetails/paymentDetails.router');
const storeRouter = require('./store/store.router');
const orderRouter = require('./Orders/orders.router');
const inventoryRouter = require('./inventory/inventory.router');
const itemRouter = require('./sold_items/sold_items.router');

var cors = require('cors')

app.use(cors())

var corsOptions = {
    origin: '*',
  optionsSuccessStatus: 200
}


app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        success: 1,
        message: "Editing directly in container"
    })

})

app.get('/', (req, res) => {
    res.json({
        success: 1,
        message: "Editing directly in container home"
    })

})


// app.use('/api/users',  userRouter);
app.use('/api/store', storeRouter); //working properly
app.use('/api/paymentDetails',  paymentDetails);
app.use('/api/orders', cors(corsOptions), orderRouter);
app.use('/api/inventory',  inventoryRouter);
app.use('/api/sold_items', itemRouter);

//-----------server------------//
app.listen( process.env.API_SERVER_PORT, () => {
    console.log(`server up and running at port: ${process.env.API_SERVER_PORT}`);
})

