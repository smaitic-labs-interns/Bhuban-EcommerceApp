const utils = require("../utils/fileUtils.js");
const fileName = './files/user_data.json';

exports.add_user = (user) => {
    utils.write_data(fileName, user);
}

exports.read_all_user = () =>{
    return utils.read_data(fileName);
}