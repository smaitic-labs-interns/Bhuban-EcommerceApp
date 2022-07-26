const Joi = require('joi');

const address_validation = Joi.object({
    country : Joi.string().required(),
    Province: Joi.string().required(),
    City: Joi.string().required(),
    Ward: Joi.number().required(),
    Tole: Joi.string().required(),
    house_no: Joi.number().required()
})

// const