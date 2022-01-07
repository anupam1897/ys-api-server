require('dotenv').config();

const { createUser, getUsers, getUserByUserId, updateUser, deleteUser, forgotPassword, login }= require('./user.controller');

const router = require('express').Router();
const jwt = require('jsonwebtoken')

// const validation = require('../auth/validation');

router.post('/', createUser);                       //working
router.get('/', authenticateToken,  getUsers);                          //working
router.get('/:id', authenticateToken,  getUserByUserId);                //working
router.patch('/', authenticateToken,  updateUser);                      //working
router.delete('/', authenticateToken,  deleteUser);                     //working
router.patch('/forgotPassword', forgotPassword);    //working



function authenticateToken(req, res,  next) {
    const authHeader = req.headers['authorization']
    const token =  authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) =>{

        if(err) return res.sendStatus(403)
        next()
    })
}

module.exports = router;