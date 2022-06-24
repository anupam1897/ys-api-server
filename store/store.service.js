const pool = require('../database');

module.exports = {
    //create Store : kyc //working properly
    createStore: (data, callback) =>{
        pool.query(`INSERT into store ( user_id,address, mobile, shop_name) VALUES (?,?,?,?)`, 
        [
            data.user_id,
            data.address,
            data.mobile,
            data.shop_name
        ],
        (err, results, fields) =>{
            if(err) callback(err)
            return callback(null, results)
        });
    },



    //read Store : kyc //working properly
    getStore: (data,callback) => {
        pool.query(`select * from store where store_id = ?`, 
        [
          data.store_id
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },



    //update Store : kyc
    updateStore: (data, callback) => {
        pool.query(`update store set address=?, shop_name = ? where store.store_id =?`, 
        [
            data.address,
            data.shop_name,
            data.store_id,
            
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },

    //update mobile in store : kyc
    updateStoreMobile: (data, callback) => {
        pool.query(`update store set mobile=? where store.store_id =?`, 
        [
            data.mobile,
            data.store_id,
            
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },

    //delete Store : kyc
    deleteStore: (data, callback) => {
        pool.query(`delete from store where user_id = ? and store_id =? `, 
        [
            data.user_id,
            data.store_id
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        }) 
    },

};


