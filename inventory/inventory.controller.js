const { create,getProducts, updateProduct, deleteProduct, createInventory, getProductId, getProductInfo, getProductByProductId } = require("./inventory.service") ;

module.exports = {
    createProduct : (req, res) =>{
        const body = req.body;
        getProductId(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            
            if (results.length>0) {
                
                 body.product_id = results[0].product_id;
                createInventory(body, (err, results)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success : 0,
                            message : "Cannot Insert"
                        });
                    } return res.status(200).json({
                        success : 1,
                        data : results
                    });
                });
            }

            else{
                create(body, (err, results)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success : 0,
                            message : "Database connection error"
                        });
                    }
                    body.product_id = results.insertId;
                    createInventory(body, (err, results)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).json({
                                success : 0,
                                message : "Cannot Insert"
                            });
                        } return res.status(200).json({
                            success : 1,
                            data : results
                        });
                    });
                })
            }
            
            
        })
    },
    //     getProductId(body, (err, results)=>{
    //         if(err){
    //             console.log(err);
    //             return res.status(500).json({
    //                 success : 0,
    //                 message : "Database connection error"
    //             });
    //         }
    //         if(!results){
    //             body.product_id = data.results
    //         }
    //         else{
    //             create(body,(err,results) =>{
    //                 if(err){
    //                     console.log(err);
    //                     return res.status(500).json({
    //                         success : 0,
    //                         message : "Database connection error"
    //                     });
    //                 }
    //                body.product_id = results.insertId
    //         },
    //         createInventory(body,(err,results) =>{

    //             if(err){
    //                 console.log(err);
    //                 return res.status(500).json({
    //                     success : 0,
    //                     message : "Cannot Insert"
    //                 });
    //             } return res.status(200).json({
    //                 success : 1,
    //                 data : results
    
    //             });

    //         });
    //     }

    // }




    getProducts : (req,res) =>{
        const body = req.body ;
        getProducts(body,(err,results) =>{
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


    
    updateProduct : (req, res) =>{
        const body = req.body ;
        updateProduct(body,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Invalid Id"
                });
            }
            if(results.affectedRows == 0){
                return res.json({
                    success:0,
                    message : "Invalid Product Id"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },



    deleteProduct : (req,res)=>{
        const body = req.body ;
        deleteProduct(body,(err,results) =>{
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
                    message : "Record Not Found"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    getProductInfo: (req, res)=>{
        getProductInfo((error, results) => {
            if(error){
                console.log(error);
                return;

            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getProductByProductId : (req, res) => {
        const body = req.body ;
      
        getProductByProductId(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            return res.status(200).json({
                success: 1, 
                data: results
            });

        })
    }, 




}