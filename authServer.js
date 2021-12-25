require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.use(express.json())

let refreshTokens = []

app.post('/login', (req, res)=>{
    //authentication user
    
    const username =  req.body.username
    const user = {name: username}
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken : refreshToken})

})

app.post('/token', (req, res)=>{
    const refreshToken = req.body.token
    if(refreshToken==null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.Refresh_SECRET, (err, user)=> {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name : user.name})
        res.json({accessToken:accessToken})
    })

})

app.delete('/logout', (req, res)=> {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
    console.log('Logged out');
})

// function authenticateToken(req, res,  next) {
//     const authHeader = req.headers['authorization']
//     const token =  authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(401)


//     jwt.verify(token, process.env.ACCESS_SECRET, (err, user) =>{

//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }

function generateAccessToken(user){
   return jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn: '3600s'}) 
   
}



app.listen(process.env.AUTH_SERVER_PORT, ()=> {
    console.log(`listening on port: ${process.env.AUTH_SERVER_PORT}`);
})
   
