// Creating User
const create_user = (user_data, fileName) =>{
    const val_res = validate_data(user_data , data_validation);
    const users_details = read_data(fileName);

    if(val_res == true){
        for (let key in users_details){
            if(key == user_data['email']){
                console.log("User Already Exists, Try login.");
                return;
            }
        }

        users_details[user_data['email']] = user_data;
        const write_res = write_data(fileName, users_details);

        if(write_res === true){
            console.log("User Registerd Sucessfully");
        }else{
            console.log(`Error occurs try again later ${write_res}`);
        }
        
    }else{
        console.log(val_res);
    }

};


// User SignIn
const user_signin = (sign_in_details) => {
    const user_datas = read_data(fileName);
    
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

exports.user_signin = user_signin;
exports.create_user = create_user;