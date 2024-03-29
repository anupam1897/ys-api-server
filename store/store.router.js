
const {
    createStore, 
    getStore,
    updateStore,
    deleteStore,
    updateStoreMobile,
    getStoreId
} = require('./store.controller');

const router = require('express').Router();

//routes
router.post('/createStore', createStore);        //working
router.post('/getStore', getStore);            //working
router.post('/getStoreId', getStoreId);            //working
router.patch('/updateStore', updateStore);       //working 
router.patch('/updateStoreMobile', updateStoreMobile);        //working
router.delete('/deleteStore', deleteStore);      //working 





module.exports = router;