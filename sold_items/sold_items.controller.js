const {createItem} = require('./sold_items.service');

module.exports = {
    createItem : (req,res) =>{
        const body = req.body;

        for(let i=0; i<body.order.length; i++ ){
            createItem(body.order[i],(err,results) =>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success : 0,
                        message : "Database connection error"
                    });
                }
                
            });
        };
        return res.status(200).json({
                    success : 1,
                   
                });
    },
}