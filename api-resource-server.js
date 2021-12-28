require('dotenv').config();

const express = require('express');
const app = express();
const userRouter = require('./users/user.router');

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        success: 1,
        message: 'working api'
    })

})

app.use('/api/users', userRouter);



app.listen(process.env.PORT || process.env.API_SERVER_PORT, () => {
    console.log(`server up and running at port: ${process.env.PORT}`);
})

