const fs = require('fs');
// Writing User Detail
const write_data = (fileName, data) =>{
    try{
        fs.writeFileSync(fileName, JSON.stringify(data,null ,2));
        return true;
    }
    catch (err) {
        return err;
    }
};