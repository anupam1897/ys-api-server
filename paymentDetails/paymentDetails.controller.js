const {
    createUPI,
    getUPI,
    updateUPI,
    deleteUPI
} = require('./paymentDetails.service');

module.exports = {
    //create UPI
    createUPI: (req, res)=>{
        const body = req.body;
        createUPI(body, (error, results)=>{
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

    //read all UPIs
    getUPI : (req, res) => {
        const body = req.body;
        getUPI(body, (error, results) => {
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

    //update UPIs
    updateUPI: (req, res) => {
        const body = req.body;
        updateUPI(body, (error, results) => {
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

    //delete UPIs
    deleteUPI: (req, res) => {
        const data = req.body;
        deleteUPI(data, (error, results) => {
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