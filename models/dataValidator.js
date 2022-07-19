const Joi = require('joi');

exports.user_schema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    middleName: Joi.string()
        .min(3)
        .max(30),
        
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    address : Joi.string()
        .max(100)
        .required(),
    
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});
