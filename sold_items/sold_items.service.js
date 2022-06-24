const pool = require('../database');

module.exports = {
    createItem : (data, callBack) =>{
        pool.query(`INSERT into sold_items (order_id,  product_id, selling_price, units_sold) VALUES (?,?,?,?)`,
        [
            data.order_id, 
            
            data.product_id, 
            data.selling_price, 
            data.units_sold


        ],
        (error, results,fields) =>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results)
        }
        );
    },

}