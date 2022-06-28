const pool = require("../database") ;

module.exports = {
    create : (data, callBack) =>{
        pool.query(`Insert into orders(store_id,customer_mobile,paid_amount, payment_type) values(?,?,?,?)`,
        [
            data.store_id,
            data.customer_mobile,
            data.paid_amount,
            data.payment_type,
        ],
        (error, results,fields) =>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results)
        }
        );
    },

    getOrders : (data, callBack) =>{
        pool.query(`Select * from orders where store_id = ? order by orders.created_at DESC`,
        [
            data.store_id
        ],
        (error, results,fields) =>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results)
        }
        );
    },

    // getTransactions : (data, callBack) =>{
    //     pool.query(`Select order_id ,customer_mobile,paid_amount,payment_type from orders where store_id = ?`,
    //     [
    //         data.store_id
    //     ],
    //     (error, results,fields) =>{
    //         if(error){
    //             return callBack(error);
    //         }
    //         return callBack(null, results)
    //     }
    //     );
    // },

    orderDetails : (data, callBack) =>{
        pool.query(`SELECT store.shop_name, orders.order_id, orders.customer_mobile, orders.paid_amount, orders.payment_type, orders.created_at, super_product.product_name,
        sold_items.selling_price, sold_items.units_sold , super_product.unit, super_product.product_img
        FROM orders 
        JOIN store ON orders.store_id = store.store_id
        JOIN sold_items on orders.order_id = sold_items.order_id
        JOIN super_product on sold_items.product_id = super_product.product_id
        WHERE orders.order_id = ?`,
        [
            data.order_id
        ],
        (error, results,fields) =>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results)
        }
        );
    },

    getItemsByOrderId: (data, callBack)=>{
        pool.query(`SELECT  orders.order_id, orders.customer_mobile, orders.paid_amount, orders.payment_type, orders.created_at, super_product.product_name,
        sold_items.selling_price, sold_items.units_sold , super_product.unit, super_product.product_img
        FROM orders 
     
        JOIN sold_items on orders.order_id = sold_items.order_id
        JOIN super_product on sold_items.product_id = super_product.product_id
        WHERE orders.order_id = ?`,
        [
            data.order_id
        ],
        (error, results, fields)=>{
            if(error){
                return callBack(error);

            }
            return callBack(null, results)
        } );
    },


    updateStock: (data, callBack)=>{
        pool.query(
            `update inventory set stock = stock - ? where  product_id = ? and store_id =? and stock >= ? `,
            [
                data.units_sold,
                data.product_id,
                data.store_id,
                data.units_sold
            ],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
    
                }
                return callBack(null, results)
            } 



        );
    },


    updatePaymentType: (data, callBack)=>{
        pool.query(
            `update orders set payment_type =  ? where  order_id = ? `,
            [ 
                data.payment_type,
                data.order_id,
            ],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
    
                }
                return callBack(null, results)
            } 



        );
    }
    

};