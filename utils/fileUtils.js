const fs = require('fs');
// Reading file
const read_data = (fileName) =>{
    try{
        return (JSON.parse(fs.readFileSync(fileName)));
    }
    catch (err) {
        return err;
    }
};


// Writing to file
const write_data = (fileName, data) =>{
    try{
        fs.writeFileSync(fileName, JSON.stringify(data,null ,2));
        return true;
    }
    catch (err) {
        return err;
    }
};

module.exports = {read_data, write_data};
 