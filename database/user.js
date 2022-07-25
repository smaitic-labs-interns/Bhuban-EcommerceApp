const utils = require("../utils/fileUtils.js");
const fileName = './files/user_data.json';

exports.add_user = (user) => {
    try{
        utils.write_data(fileName, user);
        return true;
    }catch{
        return false;
    }
}

exports.read_all_user = () =>{
    return utils.read_data(fileName);
}