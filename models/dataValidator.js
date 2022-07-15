// User data validator
const validate_data = (user_data, data_validatior) => {
    const errors={};
    for (let data in data_validatior){
        const err={};
        for (let sub_data in data_validatior[data]){
            if (sub_data == 'type' && typeof(user_data[data]) !== data_validatior[data][sub_data]){
                err[sub_data] = `${data} must be ${data_validatior[data][sub_data]} but ${typeof(user_data[data])} is provided`;
            
            }else if (sub_data == 'minLength' && user_data[data].length < data_validatior[data][sub_data]){
                err[sub_data] = `${data} must be of minimum length:  ${data_validatior[data][sub_data]} but ${user_data[data].length} is provided`;

            }else if(sub_data == 'maxLength' && user_data[data].length > data_validatior[data][sub_data]){
                err[sub_data] = `${data} must be of maximum length:  ${data_validatior[data][sub_data]} but ${user_data[data].length} is provided`;
            
            }else if (sub_data == 'minValue' && user_data[data] < data_validatior[data][sub_data]){
                err[sub_data] = `${data} must be of minimum value:  ${data_validatior[data][sub_data]} but ${user_data[data].length} is provided`;

            }else if(sub_data == 'maxValue' && user_data[data].length > data_validatior[data][sub_data]){
                err[sub_data] = `${data} must be of maximum value:  ${data_validatior[data][sub_data]} but ${user_data[data].length} is provided`;
            
            }else if(sub_data == 'required' && (data_validatior[data][sub_data] == true && user_data[data].length === 0)){
                err[sub_data] = `Required for ${data} is set to be ${data_validatior[data][sub_data]} but not provided`;
             
            }else if(sub_data == 'regex' && !(user_data[data].match(data_validatior[data][sub_data]))){
                err[sub_data] = `${data} must satisfy the pattern ${data_validatior[data][sub_data]}`;
            
            }else if(sub_data == 'enum' && !(data_validatior[data][sub_data].includes(user_data[data]))){
                err[sub_data] = `${data} Data must be from ${data_validatior[data][sub_data]} but ${user_data[data]} provided`;
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