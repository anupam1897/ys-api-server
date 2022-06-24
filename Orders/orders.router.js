const {createOrder , getOrders , getTransactions, orderDetails, getItemsByOrderId, updatePaymentType} = require("./orders.controller") ;
const jwt = require('jsonwebtoken');

const app = require('../apiServer');
const path = require('path');


app.set("views", path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


const router = require("express").Router();             



// routes
router.post("/createOrder", createOrder);                          //working 
router.post("/getOrders", getOrders) ;                            //working 
router.post("/orderDetails", orderDetails);          //working 
router.post("/getItemsByOrderId", getItemsByOrderId);         
router.patch("/updatePaymentType", updatePaymentType);         
// router.post('/orderConfimation/:id', (req, res)=>{
//     res.render("index");
// })


function authenticateToken(req, res,  next) {
    const authHeader = req.headers['authorization']
    const token =  authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) =>{

        if(err) return res.sendStatus(403)
        next()
    })
}




module.exports = router ;