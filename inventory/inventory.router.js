const { createProduct , getProducts , updateProduct,deleteProduct, getProductByProductId, getProductInfo} = require("./inventory.controller") ;

const router = require("express").Router();

router.post("/createProduct", createProduct);       //working 
router.post("/getProducts",getProducts) ;          //working 
router.post('/productInfo', getProductInfo); //working
router.post('/getProductById', getProductByProductId);  //working
router.patch("/updateProduct",updateProduct);       //working     
router.delete("/deleteProduct",deleteProduct);      //working     

module.exports = router ;