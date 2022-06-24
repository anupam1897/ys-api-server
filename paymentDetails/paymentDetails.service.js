const pool = require('../database');

module.exports = {
    //create payment_details : kyc
    createUPI: (data, callback) =>{
        pool.query(`INSERT into payment_details ( store_id,upi_id) VALUES (?,?)`, 
        [
            data.store_id,
            data.upi_id,
            
        ],
        (err, results, fields) =>{
            if(err) callback(err)
            return callback(null, results)
        });
    },

    //read payment_details : kyc
    getUPI: (data,callback) => {
        pool.query(`select * from payment_details where store_id = ?`, 
        [
          data.store_id,
         
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },

    //update payment_details : kyc
    updateUPI: (data, callback) => {
        pool.query(`update payment_details set upi_id=? where store_id =?`, 
        [
            data.upi_id,
            data.store_id,
            
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },

    //delete payment_details : kyc
    deleteUPI: (data, callback) => {
        pool.query(`delete from payment_details where store_id = ? and upi_id = ?`, 
        [
            data.store_id,
            data.upi_id
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        }) 
    },

};