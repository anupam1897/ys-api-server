
const {
    createUPI, 
    getUPI,
    updateUPI,
    deleteUPI
} = require('./paymentDetails.controller');

const router = require('express').Router();

//routes
router.post('/createUPI', createUPI);            //working
router.post('/getUPI', getUPI);                //working
router.patch('/updateUPI', updateUPI);           //working
router.delete('/deleteUPI', deleteUPI);          //working




module.exports = router;