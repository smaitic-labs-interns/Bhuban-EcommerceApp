const db = require('../repository/db.js');
const Schema = require('../models/userModel');
const Validate = require('../models/validations');


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



const user_register = (firstName, middleName, lastName, address, email, password) =>{
    try{
        const {error, value} = Validate.user_validation({firstName, middleName, lastName, address, email, password});
        if(error){
            throw error;
        }else{
            const user = Schema.User(value);
            if(!(db.user.find_user_from_email(user.email)) && db.user.add_user(user)){
                console.log("User Registerd Sucessfully");
           
            }else{
                throw new Error('User Already Registered. Try Login!');
            }  
        }                  
    }catch(err){
        console.log(`${err.name} => ${err.message}`);
    }
 
};

user_register("Bhuban","Prasad", "Yadav", "Dhapakhel-23", "bhuban@smaitic.com", "bhubany")

/* User SignIn
@params
    1) sign_in_details : "username and password", signInObject
@returns
    @if(value matched)
        return login sucess message
    @else
        return Error
*/
const user_signin = async(email, password) => {  
    try{
        const {error, value} = sign_in_validation.validateAsync({email, password});
        if(value){
            const signinDetails = {...value, password: crypto.createHash('md5').update(value.password).digest("hex")}
            if(db.user.verify_login_details(signinDetails)){
                return console.log("Login Successfull !");
            }else{
                throw new Error(`Invalid Login Credintals.`)
            }
        }else{
            throw new Error(signinDetails.errMessage);
        }
    }catch(e){
        console.log(`${e.name} => ${e.message}`);
    }
}

// user_signin("bhuban@smaitic.com", "bhubany");

module.exports = {user_register, user_signin};