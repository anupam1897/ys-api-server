const pool = require('../database');
module.exports = {
    //create user
    create: (data, callback) => {
        pool.query(`insert into user (mobile, password ) values (?,?)`,
        [
            data.mobile,
            data.password 
        ], 

        (err, results, fields) => {
            if(err) callback(err)
            return callback(null, results)
        }

        );
    },

    //get all users
    getUsers: callback => {
        pool.query(`select * from user`,
         [],
         (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },

    //get user by id
    getUserByUserId: (id, callback) => {
        pool.query(`select * from user where id = ?`, 
        [
            id
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results[0]);
        })
    },

    //update user
    updateUser: (data, callback) => {
        pool.query(`update user set user_id=?, firstName = ?, lastName = ?,gender= ?, email = ?, mobile = ? where id =?`, 
        [
            data.user_id,
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.mobile,
            data.id
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },

    //delete user
    deleteUser: (data, callback) => {
        pool.query(`delete from user where id = ?`, 
        [
            data.id
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        }) 
    },

    //update password, Forgot password? change password, reset password using mobile
    forgotPassword: (data, callback) => {
        pool.query(`update user set password = ? where mobile = ?`, 
        [
            data.password, 
            data.mobile
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },


    getUserByUserMobile: (mobile, callback) => {
        pool.query(`select * from user where mobile = ?`, 
        [
            mobile
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results[0]);
        })
    },


};