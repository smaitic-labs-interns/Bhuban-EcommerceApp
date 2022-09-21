const Joi = require('joi');

const user_validation = ({firstName, middleName, lastName, address, email, password}) => {
    const user_rule = Joi.object({
            firstName: Joi.string().min(3).max(30).required(),
            middleName: Joi.string().allow('',null).min(3).max(30),
            lastName: Joi.string().min(3).max(30).required(),
            address : Joi.string().max(100).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        });

    return user_rule.validate({firstName, middleName, lastName, address, email, password});
}

const sign_in_validation = ({email, password}) => {
    const credintals_rule = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    return credintals_rule.validate({email, password});
}

const product_validation = ({category, model, brand, description, price, quantity, rating}) => {
    const product_rule = Joi.object({
        category: Joi.string().required(),
        model: Joi.required(),
        brand: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        rating: Joi.number().required()
    });
    return product_rule.validate({category, model, brand, description, price, quantity, rating});
}

const updating_product_validation = ({category, model, brand, description, price, quantity, rating}) => {
    const update_product_rule = Joi.object({
        category: Joi.string().allow('',null),
        model: Joi.string().allow('',null),
        brand: Joi.string().allow('',null),
        description: Joi.string().allow('',null),
        price: Joi.number().allow('',null),
        quantity: Joi.number().allow(0,'',null),
        rating: Joi.number().allow('',null)
    });
    return update_product_rule.validate({category, model, brand, description, price, quantity, rating});

}


const address_validation = ({country, province, city, ward, tole, houseNo}) => {
    const address_schema = Joi.object({
        country : Joi.string().required(),
        province: Joi.string().required(),
        city: Joi.string().required(),
        ward: Joi.number().required(),
        tole: Joi.string().required(),
        houseNo: Joi.number().required()
    });
    return address_schema.validate({country, province, city, ward, tole, houseNo});
}

const Updatable_address_validation = ({country, province, city, ward, tole, houseNo}) => {
    const updatable_address_schema = Joi.object({
        country : Joi.string().allow('',null),
        province: Joi.string().allow('',null),
        city: Joi.string().allow('',null),
        ward: Joi.number().allow('',null),
        tole: Joi.string().allow('',null),
        houseNo: Joi.number().allow('',null)
    });
    return updatable_address_schema.validate({country, province, city, ward, tole, houseNo});
}

module.exports = {user_validation, sign_in_validation, product_validation, updating_product_validation ,address_validation, Updatable_address_validation};


