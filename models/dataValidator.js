const validation_rule = require('./validationRule');

// User data validator
const validate_data = (user_data, validation_rule) => {
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

module.exports = validate_data;