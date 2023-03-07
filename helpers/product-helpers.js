var db=require('../config/connection');
var collection=require('../config/collection');

module.exports={

    //function to add products
    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.insertedId);
        })
    },

    //function to get added products
    getAllProducts:()=>{
        return new Promise((resolve,reject)=>{
            let products=db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
            resolve(products);
        })
    }
}