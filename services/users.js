const db = require('../database/db.js');
const validate_data = require('../models/dataValidator');

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
        const users_details = db.user.read_all_user();
        if(val_res){
            for (let key in users_details){
                if(key == user_data['email']){
                    throw new Error("User Already Exists, Try login.");
                }
            }

            users_details[user_data['email']] = user_data;
            db.user.add_user(users_details);
            console.log("User Registerd Sucessfully");
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
exports.user_signin = (sign_in_details) => {
    const user_datas = db.user.read_all_user();
    
    for (key in user_datas){
        if(sign_in_details['email'] === key && sign_in_details['password'] === user_datas[key]['password']){
            console.log("Login Successfull !");
            is_user_signin = true;
            return;
        }else{
            console.log("Credintals did not matched");
        }
    }
}
