require('dotenv').config();


const express = require('express');
const app = express();
module.exports = app;
const jwt = require('jsonwebtoken')
const {customerOrders, getItemsByOrderId, orderDetails} = require("./Orders/orders.service") ;


//routes ---------------------//
const paymentDetails = require('./paymentDetails/paymentDetails.router');
const storeRouter = require('./store/store.router');
const orderRouter = require('./Orders/orders.router');
const inventoryRouter = require('./inventory/inventory.router');
const itemRouter = require('./sold_items/sold_items.router');

var cors = require('cors')

app.use(cors())
app.use(require("body-parser").json())

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
app.use('/api/store', authenticateToken, storeRouter); //working properly
app.use('/api/paymentDetails', authenticateToken,  paymentDetails);
app.use('/api/orders', authenticateToken, cors(corsOptions), orderRouter);

app.use('/api/inventory', authenticateToken,  inventoryRouter);
app.use('/api/sold_items', authenticateToken, itemRouter);

//---------authenticate brearer token------------//
function authenticateToken(req, res,  next) {
    const authHeader = req.headers['authorization']
    const token =  authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) =>{

        if(err) return res.sendStatus(403)
        next()
    })
}

//-----------server------------//
app.listen(process.env.PORT ||  process.env.API_SERVER_PORT, () => {
    console.log(`server up and running at port: ${process.env.API_SERVER_PORT}`);
})

app.post('/:mobile', (req,res)=>{
    const customer_mobile = req.params.mobile.toString();
    
    
    customerOrders(customer_mobile, (err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ 
                success: 0,
                message: "Database Connection Error"
            });
        }
        if(!results){
            return res.json({
                success:0,
                message : "Nothing to show"
            });
        }

        console.log(results);

        if(results.length > 0){
            
        
        var body = {};
        body.order_id = results[0].order_id;
        
        getItemsByOrderId(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({ 
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            if(!results){
                return res.json({
                    success:0,
                    message : "Nothing to show"
                });
            }
            
            return res.status(200).json({
                success : 1,
            
                items: results
                
            });
        }
        )
    }else{
        res.status(200).json({
            success: 1,
            items : results
        })
    }

    })
});