// validation rules
const validation_rule = {
    firstName : {
        type: 'string',
        minLength: 5,
        maxLength: 30,
        required: true,
        regex: /[a-zA-Z]/g,
    },
    middleName : {
        type: 'string',
        maxLength: 30,
        required: false,
        regex: /[a-zA-Z]/g,
    },lastName : {
        type: 'string',
        maxLength: 30,
        required: true,
        regex: /[a-zA-Z]/g,
    },
    address : {
        type : 'string',
        maxLength : '100',
        required : true
    },
    email:{
        minLength: 10,
        maxLength: 50,
        required: true,
        regex: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    },
    password:{
        minLength: 6,
        maxLength: 20,
        required: true
    }
}

// User data validator
exports.validate_data = (user_data, validation_rule) => {
    const errors={};
    for (let data in validation_rule){
        const err={};
        for (let sub_data in validation_rule[data]){
            if (sub_data == 'type' && typeof(user_data[data]) !== validation_rule[data][sub_data]){
                err[sub_data] = `${data} must be ${validation_rule[data][sub_data]} but ${typeof(user_data[data])} is provided`;
            
            }else if (sub_data == 'minLength' && user_data[data].length < validation_rule[data][sub_data]){
                err[sub_data] = `${data} must be of minimum length:  ${validation_rule[data][sub_data]} but ${user_data[data].length} is provided`;

            }else if(sub_data == 'maxLength' && user_data[data].length > validation_rule[data][sub_data]){
                err[sub_data] = `${data} must be of maximum length:  ${validation_rule[data][sub_data]} but ${user_data[data].length} is provided`;
            
            }else if (sub_data == 'minValue' && user_data[data] < validation_rule[data][sub_data]){
                err[sub_data] = `${data} must be of minimum value:  ${validation_rule[data][sub_data]} but ${user_data[data].length} is provided`;

            }else if(sub_data == 'maxValue' && user_data[data].length > validation_rule[data][sub_data]){
                err[sub_data] = `${data} must be of maximum value:  ${validation_rule[data][sub_data]} but ${user_data[data].length} is provided`;
            
            }else if(sub_data == 'required' && (validation_rule[data][sub_data] == true && user_data[data].length === 0)){
                err[sub_data] = `Required for ${data} is set to be ${validation_rule[data][sub_data]} but not provided`;
             
            }else if(sub_data == 'regex' && !(user_data[data].match(validation_rule[data][sub_data]))){
                err[sub_data] = `${data} must satisfy the pattern ${validation_rule[data][sub_data]}`;
            
            }else if(sub_data == 'enum' && !(validation_rule[data][sub_data].includes(user_data[data]))){
                err[sub_data] = `${data} Data must be from ${validation_rule[data][sub_data]} but ${user_data[data]} provided`;
            }
        }

        if(Object.keys(err).length !== 0){
            errors[data] = err;
        }
    };
    if(Object.keys(errors).length !== 0){
        return errors;
    }else{
        return true;
    }
}