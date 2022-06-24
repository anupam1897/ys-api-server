const {
    createStore, 
    getStore,
    updateStore,
    deleteStore,
    updateStoreMobile: updateStoreMobile
} = require('./store.service');

module.exports = {
    //create Store
    createStore: (req, res)=>{
        const body = req.body;
        createStore(body, (error, results)=>{
            if (error)
            { 
                console.log(error);
                return res.status(500).json({ 
                    success: 0,
                    message: "Database Connection Erroror"
                });
            }
            
            else {
                res.status(200).json({
                    success: 1,
                    data: results
                });
            }

        });
    },

    //read all Store
    getStore : (req, res) => {
        const body = req.body;
        getStore(body, (error, results) => {
            if(error){
                console.log(error);
                return;
            }
            if(!results){
                return res.status(200).json({
                    success: 0,
                    data: "not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    //update Store
    updateStore: (req, res) => {
         
        const body = req.body;
        updateStore(body, (error, results) => {
            if (error)
            { 
                console.log(error);
                return;
            }
            if(results.affectedRows == 0) {
                return res.json({
                    success: 0,
                    message: "No such record was found",
                    data: results
                });
            }          
            else {
                res.status(200).json({
                    success: 1,
                    message: 'Updated Successfully' 
                });
            }
            
        })
    }, 

    //update store mobile
    updateStoreMobile: (req, res) => {
        const body = req.body;
        updateStoreMobile(body, (error, results) => {
            if (error)
            { 
                console.log(error);
                return;
            }
            if(results.affectedRows == 0) {
                return res.json({
                    success: 0,
                    message: "No such mobile was found in store",
                    data: results
                });
            }          
            else {
                res.status(200).json({
                    success: 1,
                    message: 'Updated Successfully' 
                });
            }
            
        })
    }, 


    //delete Store
    deleteStore: (req, res) => {
        const data = req.body;
        deleteStore(data, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if(results.affectedRows == 0) {
                return res.json({
                    success: 0,
                    message: "No such record was found",
                    data: results
                });
            }
            else{
                return res.json({
                    success: 1,
                    message: "Deleted Successfully",
                    data:  results
                });
            }
        });
    }, 




};