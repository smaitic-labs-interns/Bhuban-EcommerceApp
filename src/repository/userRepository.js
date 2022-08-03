const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.USER_FILE_PATH;
const bcrypt = require('bcrypt');

const read_all_user = async() =>{
    try{
        return await utils.read_data(fileName).then((res)=>res);
    }catch(err){
        throw err;
    }
}
  

const allUser = read_all_user();
// console.log(allUser);
// allUser.then((res)=>console.log(res))


const add_user = (user) => { //add user
    try{
        allUser.push(user);
        return utils.write_data(fileName, allUser);
    }catch(err){
        throw err;
    }
}

const find_user_from_email = (email) => { //find user from email
    try{
        for (user of allUser){
            if(email === user.email) return user;
        }
        return false;
    }catch(err){
        throw err;
    }
}

// compare password


const find_user_from_credintals = (login) => { // find user from credintals
    try{
        for (user of allUser){
            if(login.email === user.email && bcrypt.compareSync(login.password, user.password))  return user;
        }
        throw new Error(`Invalid login Credintals`);
    }catch(err){
        throw err;
    }
}

module.exports = {add_user, read_all_user, find_user_from_email, find_user_from_credintals}; 