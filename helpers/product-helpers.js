var db=require('../config/connection');
var collection=require('../config/collection');
const { ObjectId } = require('mongodb');
const { response } = require('express');
var objectId=require('mongodb').ObjectId;

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
    },

    // function to delete products
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:new ObjectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response);
            })
        })
    }
}