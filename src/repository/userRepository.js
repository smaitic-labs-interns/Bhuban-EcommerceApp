const bcrypt = require('bcrypt');
const dbConnect = require('../config/mongoDb');
const userCollection = "users";

const read_all_user = async() =>{
    try{
        let data = await dbConnect(userCollection);
        data = await data.find().toArray();
        return data;
    }catch(err){
        throw err;
    }
}

const add_user = async(user) => { //add user
    try{
        let db = await dbConnect(userCollection);
        const result = await db.insertOne(user);
        return result.acknowledged;
    }catch(err){
        throw err;
    }
}

const find_user_from_email = async(email) => { //find user from email
    try{
        let db = await dbConnect(userCollection);
        let user = await db.findOne({email:email});
        if(user) return user;
        return false;
    }catch(err){
        throw err;
    }
}


const find_user_from_credintals = async(login) => { // find user from credintals
    try{
        let db = await dbConnect(userCollection);
        let user = await db.findOne({email:login.email});
        if(login.email === user.email && bcrypt.compareSync(login.password, user.password))  return user;
        throw new Error(`Invalid login Credintals`);
    }catch(err){
        throw err;
    }
}

module.exports = {add_user, read_all_user, find_user_from_email, find_user_from_credintals}; 