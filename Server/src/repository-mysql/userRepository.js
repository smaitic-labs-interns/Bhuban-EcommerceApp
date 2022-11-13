const bcrypt = require('bcrypt');
const con = require('../config/mysqlDb');

const read_all_user = async() =>{
    try{
        let users = await con.awaitQuery("SELECT * FROM users ");
        if(users.length >0 ) return users;
        throw new Error(`No User Found`);
    }catch(err){
        throw err;
    }
}

const add_user = async(user) => { //add user
    try{
        const result = await con.awaitQuery("INSERT INTO users SET ? ", user);
        if(result.affectedRows > 0) return true;
        throw new Error('Error occurs adding user. Try again Later');
    }catch(err){
        throw err;
    }
}

const find_user_from_email = async(email) => { //find user from email
    try{
        let user = await con.awaitQuery("SELECT * FROM users WHERE email= ?", [email]);
        if(user.length >0 ) return user[0];
        return false;
    }catch(err){
        throw err;
    }
}


const find_user_from_credintals = async(login) => { // find user from credintals
    try{
        let user = await con.awaitQuery("SELECT * FROM users WHERE email= ?", [login.email]);
        if(user.length > 0){
            if(bcrypt.compareSync(login.password, user[0].password))  return user[0];
        }
        throw new Error(`Invalid login Credintals`);
    }catch(err){
        throw err;
    }
}

const find_user_from_id = async(userId) => {
    try{
        let user = await con.awaitQuery("SELECT * FROM users WHERE id= ?", [userId]);
        if(user.length > 0) return user[0];
        return false;
    }catch(err){
        throw err;
    }

}

module.exports = {add_user, read_all_user, find_user_from_email, find_user_from_credintals, find_user_from_id}; 