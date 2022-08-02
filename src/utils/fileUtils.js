const fs = require('fs');
const prompt = require('prompt-sync')();

// Reading file
exports.read_data = async(fileName) =>{
    try{
        fs.readFile(fileName, (err, result) => {
            if(err){
                throw err;
            }
            return (JSON.parse(result));
        })
    }
    catch (err) {
        throw err;
    }
};


// Writing to file
exports.write_data = async(fileName, data) =>{
    fs.writeFile(fileName, JSON.stringify(data,null ,2), (err, result) => {
    if(err){
        throw err;
    }
    return true;
    });
}


// For taking User Input through command line
exports.get_user_input = (data_to_read) => {
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