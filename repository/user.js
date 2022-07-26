const utils = require("../utils/fileUtils.js");
const fileName = './files/user_data.json';

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
    if(allUser.length === 0){
        return false;
    }else{
        for (var i=0; i< allUser.length ; i++){
            if(email === allUser[i].email){
                return allUser[i];
            }else{
                return false;
            }
        }
    }
}

const find_user_from_credintals = (login) => { // find user from credintals
    for (var i=0; i< allUser.length ; i++){
        if(login.email === allUser[i].email && login.password === allUser[i].password){
            return true;
        }else{
            return false
        }
    }
}

module.exports = {add_user, read_all_user, find_user_from_email, find_user_from_credintals};