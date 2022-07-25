const db = require('../database/db.js');
const validate_data = require('../models/dataValidator');
const {v4: uuidv4} = require('uuid');

const all_users = db.user.read_all_user();

/* Creating User 
@params
    1) user_data: "User full details", userObject
@returns
    @if(already registered)
        returns login message
    @else if(registered sucessfully)
        returns sucess message
    @else
        returns Error
*/
const create_user = (user_data) =>{
    try{
        const val_res = validate_data.user_schema.validateAsync(user_data);
        if(val_res){
            for (let key in all_users){
                if(all_users[key]["email"] == user_data['email']){
                    throw new Error("User Already Exists, Try login.");
                }
            }
            all_users[uuidv4()] = user_data;
            if(db.user.add_user(all_users)){
                console.log("User Registerd Sucessfully");
            }else{
                throw new Error('Error occurs while registering user');
            }
        }else{
            throw new Error(val_res);

        }
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
 
};

/* User SignIn
@params
    1) sign_in_details : "username and password", signInObject
@returns
    @if(value matched)
        return login sucess message
    @else
        return Error
*/
const user_signin = (sign_in_details) => {  
    try{ 
        var invalidCredintals = true;
        for (key in all_users){
            if(sign_in_details['email'] === all_users[key]["email"] && sign_in_details['password'] === all_users[key]['password']){
                invalidCredintals = false
                return console.log("Login Successfull !");
            }
        }
        if(invalidCredintals){
            throw new Error(`Invalid Login Credintals.`)
        }
    }catch(e){
        console.log(`${e.name} => ${e.message}`);
    }
}

module.exports = {create_user, user_signin};