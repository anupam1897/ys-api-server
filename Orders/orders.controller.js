const {create, getOrders, orderDetails, getItemsByOrderId, updateStock, updatePaymentType } = require("./orders.service") ;
const {createItem} = require('../sold_items/sold_items.service');

module.exports = {
    createOrder : (req,res) =>{
        const body = req.body;
        const store_id = body.store_id;
       

        create(body,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            else{
            const orderID = results.insertId;   

            for(let i=0; i<body.order.length; i++ ){
                body.order[i].order_id = orderID;        
                              body.order[i].store_id = store_id;
               
                createItem(body.order[i],(err,results) =>{
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success : 0,
                            message : "Database connection error"
                        });
                    }                    
                    

                    updateStock(body.order[i], (err, results)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).json({
                                success : 0,
                                message : "Database connection error"
                            });
                        } 
                         
                    });
                    
                });
            };
            return res.status(200).json({
                success : 1,
                url: 'http://localhost:3000/api/order/orderConfimation/'+ orderID,
                order_id: orderID
            });
        }
        });
    },

    

    getOrders : (req,res) =>{
        const body = req.body;
       
        getOrders(body,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Invalid Id"
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
                data : results,
              
              
            });
        });
    },
    getTransactions : (req, res) =>{
        const body = req.body;
        getTransactions(body,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Invalid Id"
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
                data : results
            });
        });
    },



    orderDetails: (req, res)=>{
        const body = req.body;
        orderDetails(body, (error, results)=>{
            if(error){
                console.log(error);
            }
            if(!results){
                res.json({
                    success: 0,
                    message: "No orders Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
  
        })
    },

    getItemsByOrderId: (req, res) =>{
        const body = req.body;
        getItemsByOrderId(body, (error, results)=>{
            if(error){
                console.log(error);
            }
            if(!results){
                res.json({
                    success: 0,
                    message: "No items found"
                })
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },


    updatePaymentType: (req,res)=>{
        const body = req.body;
        updatePaymentType(body, (error, results)=>{
            if(error){
                console.log(error);
            }
            if(!results){
                res.json({
                    success: 0,
                    message: "No order found"
                })
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    }



}