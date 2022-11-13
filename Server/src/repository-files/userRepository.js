const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.USER_FILE_PATH;
const bcrypt = require('bcrypt');



const read_all_user = async() =>{
    try{
        const data =  await utils.read_data(fileName);
        return data;
    }catch(err){
        throw err;
    }
}

const add_user = async(user) => { //add user
    try{
        const allUser = await read_all_user();
        allUser.push(user);
        return utils.write_data(fileName, allUser);
    }catch(err){
        throw err;
    }
}

const find_user_from_email = async(email) => { //find user from email
    try{
        const allUser = await read_all_user();
        for (user of allUser){
            if(email === user.email) return user;
        }
        return false;
    }catch(err){
        throw err;
    }
}


const find_user_from_credintals = async(login) => { // find user from credintals
    try{
        const allUser = await read_all_user();
        for (user of allUser){
            if(login.email === user.email && bcrypt.compareSync(login.password, user.password))  return user;
        }
        throw new Error(`Invalid login Credintals`);
    }catch(err){
        throw err;
    }
}

const find_user_from_id = async(userId) => {
    try{
        const allUser = await read_all_user();
        for (user of allUser){
            if(user.id === userId)  return user;
        }
        return false;
    }catch(err){
        throw err;
    }

}

module.exports = {add_user, read_all_user, find_user_from_email, find_user_from_credintals, find_user_from_id}; 