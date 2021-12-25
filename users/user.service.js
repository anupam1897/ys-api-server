const pool = require('../database');
module.exports = {
    create: (data, callback) => {
        pool.query(`insert into user (mobile, password ) 
        values (?,?)`,
        [
           
            data.mobile,
            data.password 
        ], 

        (err, results, fields) => {
            if(err) callback(err)
            return callback(null, results)
        }

        );
    }
};