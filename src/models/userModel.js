const {v4: uuidv4} = require("uuid");
const bcrypt = require('bcrypt');
const validation = require('../utils/validations');

 
const User = ({firstName, middleName, lastName, address, email, password}) =>{
    const {error, value} = validation.user_validation({firstName, middleName, lastName, address, email, password});
    if(error) throw error;
    
    return {
        id: uuidv4(),
        firstName: value.firstName,
        middleName: value.middleName,
        lastName: value.lastName,
        address: value.address,
        email: value.email,
        password: bcrypt.hashSync(value.password, 10)
    }
}
 
 

// const SigninDetails = async({email, password}) => {
//     try{
//         const value = await sign_in_validation.validateAsync({email, password});
//         return{error: false, value:{...value, password: crypto.createHash('md5').update(value.password).digest("hex")}}
//     }catch(error){
//         return {error:true, errMessage:error.message};
//     }
// }
module.exports = {User};