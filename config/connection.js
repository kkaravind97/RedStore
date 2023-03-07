const{MongoClient}=require('mongodb');
const state={
    db:null,
};
const url="mongodb://127.0.0.1:27017";
const dbName="redstore";
const client=new MongoClient(url);
const connect=async(callback)=>{
    try{
        await client.connect();
        const db=client.db(dbName);
        state.db=db;
        return callback();
    }catch{
        return callback(error)
    }
};
const get=()=>state.db;

module.exports={
    connect,
    get,
};