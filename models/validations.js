const Joi = require('joi');

const user_validation = ({firstName, middleName, lastName, address, email, password}) => {
    const user_rule = Joi.object({
            firstName: Joi.string().min(3).max(30).required(),
            middleName: Joi.string().min(3).max(30),
            lastName: Joi.string().min(3).max(30).required(),
            address : Joi.string().max(100).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        });

    return user_rule.validate({firstName, middleName, lastName, address, email, password});
}

exports.product_schema = Joi.object({
    category: Joi.string().required(),
    model: Joi.required(),
    brand: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    rating: Joi.number().required()
});

exports.address_schema = Joi.object({
    country : Joi.string().required(),
    Province: Joi.string().required(),
    City: Joi.string().required(),
    Ward: Joi.number().required(),
    Tole: Joi.string().required(),
    house_no: Joi.number().required()
})

module.exports = {user_validation};