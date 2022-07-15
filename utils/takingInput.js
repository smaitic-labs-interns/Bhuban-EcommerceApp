const prompt = require('prompt-sync')();

// For taking User Input
const  get_user_input = (data_to_read) => {
    const user_data ={};
    for (let i =0; i< data_to_read.length; i++){
        const value = prompt(`Enter ${data_to_read[i]} : `);
        user_data[data_to_read[i]] = value;
    }
    if(Object.keys(user_data) !== 0){
        return user_data;
    }else{
        console.log("Error occurs taking input");
    }
}

module.exports = get_user_input;