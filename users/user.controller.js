require("dotenv").config();

const {create, getUsers, getUserByUserId, updateUser, deleteUser, forgotPassword, getUserByUserMobile }= require('./user.service');
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const {sign} = require('jsonwebtoken');


module.exports = {
    //create user
    createUser: (req, res) => {
        const body = req.body;
        body.password = hashSync(body.password, genSaltSync(10));
        create(body, (error, results) => {
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
    //get all users
    getUsers : (req, res) => {
        getUsers((error, results) => {
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
    //get user
    getUserByUserId : (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (error, results) => {
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
    //update user
    updateUser: (req, res) => {
        const body = req.body;
        // body.password = hashSync(body.password, genSaltSync(10));
        updateUser(body, (error, results) => {
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
            
        });
    }, 
    //delete user
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (error, results) => {
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

    //update password, Forgot password? change password, reset password using mobile
    forgotPassword: (req, res) => {
        const body = req.body;
        body.password = hashSync(body.password, genSaltSync(10));
        forgotPassword(body, (error, results) => {
            if (error)
            {
                console.log(error);
                return;
            }
            if(results.affectedRows == 0){
                res.json({ 
                    success: 0,
                    message: "No record found" 
                    
                });
            }
            
                    
            else {
                res.status(200).json({
                    success: 1,
                    message: 'Password Changed Successfully',
                    data: results 
                });
            }
            
        });
    }, 

    // //login with mobile 
    // login: (req, res)=>{
    //     const body = req.body;
    //     getUserByUserMobile(body.mobile, (erroror, results)=>{
    //         if(erroror){
    //             console.log(erroror);
    //         }
    //         if(!results){ 
    //             return res.json({ 
    //                 success: 0,
    //                 data: "Invalid email or password"
    //             });
    //         }
            
    //         const result = compareSync(body.password, results.password);
    //             if(result){
    //                 results.password = undefined;
    //                 const accessToken = sign(
    //                     {result: results}, 
    //                     process.env.ACCESS_SECRET,
    //                     { expiresIn : "1h"} 
    //                 );
    //                 return res.json({ 
    //                     success: 1,
    //                     message: "Login successful",
    //                     accessToken: accessToken
    //                 });
    //             }
    //             else{
    //               return res.json({
    //                   success: 0,
    //                   data: "Invalid email or password 2"
    //               });
    //         }
    //     });
    // }

}