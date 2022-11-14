const {MongoClient} = require('mongodb');
require('dotenv').config();
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const database = "eCommerceApp"

const db_connect = async(collection)=>{
    let result = await client.connect();
    let db = result.db(database);
    return db.collection(collection);
}

module.exports = {db_connect}; // use credintals