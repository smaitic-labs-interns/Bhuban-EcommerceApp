const utils = require("../utils/fileUtils.js");
require('dotenv').config();
const fileName = process.env.USER_FILE_PATH;

const read_all_user = () =>{
    return utils.read_data(fileName);
}

const allUser = read_all_user(); // reading all user

const add_user = (user) => { //add user
    try{
        allUser.push(user);
        utils.write_data(fileName, allUser);
        return true;
    }catch(err){
        console.log(`Error: ${err.message}`);
        return false;
    }
}

const find_user_from_email = (email) => { //find user from email
    for (user of allUser){
        if(email === user.email) return user;
    }
    return false;
}


const find_user_from_credintals = (login) => { // find user from credintals
    for (user of allUser){
        if(login.email === user.email && login.password === user.password)  return user;
    }
    return false;
}

module.exports = {add_user, read_all_user, find_user_from_email, find_user_from_credintals}; 