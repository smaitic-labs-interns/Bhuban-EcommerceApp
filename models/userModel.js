const {v4: uuidv4} = require("uuid");
const crypto = require('crypto');
 
const User = ({firstName, middleName, lastName, address, email, password}) =>{

    return {
        id: uuidv4(),
        firstName,
        middleName,
        lastName,
        address,
        email,
        password: crypto.createHash('md5').update(password).digest("hex")
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