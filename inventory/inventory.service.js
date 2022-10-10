const pool = require("../database") ;

module.exports = {
    create: (data, callBack) =>{
        pool.query(
            `Insert into super_product( product_name, description, mrp, category, unit, brand, barcode) values(?,?,?,?,?,?,?)`,
            [
                data.product_name,
                data.description,
                data.mrp,
                data.category,
                data.unit,
                data.brand,
                data.barcode
            ],
            (error, results,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },


    createInventory: (data, callBack) =>{
        pool.query(
            `Insert into inventory(product_id, selling_price, store_id, stock) values(?,?,?,?)`,
            [
                data.product_id,
               data.selling_price,
               data.store_id,
               data.stock
            ],
            (error, results,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getProducts :(data, callBack) =>{
        pool.query(`select super_product.product_id,  super_product.product_name,  super_product.description,  super_product.mrp,  
        super_product.category,  super_product.unit, super_product.brand, inventory.selling_price ,inventory.stock , super_product.product_img, super_product.barcode
        from inventory 
        JOIN super_product ON inventory.product_id = super_product.product_id 
        where inventory.store_id = ? order by inventory.updated_at DESC , inventory.created_at DESC`,
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
    updateProduct :(data, callBack) =>{
        pool.query(`update inventory set selling_price =?, stock=? where product_id = ? and  store_id = ?`,
            [
                data.selling_price,
                data.stock,
                data.product_id,
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
    deleteProduct :(data,callBack) =>{
        pool.query(`delete from inventory where product_id = ? and store_id = ?`,
        [
            data.product_id,
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

    getProductId: (data, callBack)=>{
        pool.query(`select product_id from super_product where product_name = ? AND brand = ? AND  description = ? AND category = ? AND mrp = ? AND unit = ?`,
        
        [
            data.product_name,
            data.brand,
            data.description,
            data.category,
            data.mrp,
            data.unit
        ],
        
        (error, results,fields) =>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results)
        }
        );
    },


    //get id, name and desc of the product for autofill

    getProductInfo:callback => {
        pool.query(`select product_id, product_name from super_product`,
         [],
         (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results);
        })
    },


    getProductByProductId: (data, callback) => {
        pool.query(`select product_name, description, mrp, category, unit, brand from super_product where product_id = ? or barcode = ?`, 
        [
            data.product_id,
            data.barcode
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results[0]);
        })
    },
    
    checkIfProductExists: (data, callback)=>{
        pool.query(`SELECT COUNT(*) count FROM inventory WHERE product_id = ? and store_id = ?;`,
        [
            data.product_id,
            data.store_id
        ], 
        (err, results, fields) =>{
            if(err) {
                return callback(err);
            }
            return callback(null, results[0]);
        })
    }

};
