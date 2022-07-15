const utils = require("../utils/fileUtils.js");
const fileName = './files/user_data.json';

const add_user = (user) => {
    utils.write_data(fileName, user);
}

const read_all_user = () =>{
    return utils.read_data(fileName);
}
module.exports = {add_user, read_all_user};