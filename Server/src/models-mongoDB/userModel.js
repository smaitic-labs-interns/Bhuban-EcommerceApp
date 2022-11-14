const bcrypt = require('bcrypt');
const validation = require('../utils/validations');

 
const User = ({firstName, middleName, lastName, address, email, password}) =>{
    const {error, value} = validation.user_validation({firstName, middleName, lastName, address, email, password});
    if(error) throw error;
    
    return {
        firstName: value.firstName,
        middleName: value.middleName,
        lastName: value.lastName,
        address: value.address,
        email: value.email,
        password: bcrypt.hashSync(value.password, bcrypt.genSaltSync(10))
    }
}

module.exports = {User};