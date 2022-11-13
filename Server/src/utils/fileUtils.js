const fs = require('fs/promises');

// Reading file
exports.read_data = async(fileName) =>{
    try{
        const data =  await fs.readFile(fileName, "utf-8");
        return JSON.parse(data)       
    }catch (err) {
        throw err;
    }
};

// Writing to file
exports.write_data = async(fileName, data) =>{
    try{
        await fs.writeFile(fileName, JSON.stringify(data,null ,2))
        return true;
    }catch(err){
        throw err;
    }
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
