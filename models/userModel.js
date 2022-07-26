const Joi = require('joi');
const {v4: uuidv4} = require("uuid");
const crypto = require('crypto');
 

const user_validation = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    middleName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30).required(),
    address : Joi.string().max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

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

    // try{
        // const {error, value} = user_validation.validate({firstName, middleName, lastName, address, email, password}); //joi package
        // if(error){
        //     throw error;
        // }else{
        //     return {id: uuidv4(),...value, password: crypto.createHash('md5').update(value.password).digest("hex")}
        // }
        // return{error: false, value:{id: uuidv4(),...value, password: crypto.createHash('md5').update(value.password).digest("hex")}}
    // }catch(error){
        // return {error:true, errMessage:error.message};
    // }
}

// User("123","Prasad", "Yadav", "Dhapakhel-23", "bhuban@smaitic.com", "bhubany");

const sign_in_validation = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

const SigninDetails = async({email, password}) => {
    try{
        const value = await sign_in_validation.validateAsync({email, password});
        return{error: false, value:{...value, password: crypto.createHash('md5').update(value.password).digest("hex")}}
    }catch(error){
        return {error:true, errMessage:error.message};
    }
}
module.exports = {User, SigninDetails};