const fs = require('fs');
// Reading Users Details
const read_data = (fileName) =>{
    try{
        return (JSON.parse(fs.readFileSync(fileName)));
    }
    catch (err) {
        return err;
    }
};


module.exports = read_data;