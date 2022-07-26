const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const product_validation = Joi.object({
    category: Joi.string().required(),
    model: Joi.required(),
    brand: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    rating: Joi.number().required()
});


const Product = async({category, model, brand, description, price, quantity, rating}) => {
    try{
        const value = await product_validation.validateAsync({category, model, brand, description, price, quantity, rating});
        return{error: false, value:{id: uuidv4(),...value}}
    }catch(err){
        return {error:true, errMessage:err.message};
    }
}

const update_product_validation = Joi.object({
    category: Joi.string(),
    model: Joi.string(),
    brand: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    rating: Joi.number()
});

const Update_Product = async({category, model, brand, description, price, quantity, rating}) => {
    try{
        // const value = await update_product_validation.validateAsync({category, model, brand, description, price, quantity, rating});
        value = {category, model, brand, description, price, quantity, rating}
        return{error: false, value:{...value}}
    }catch(err){
        return {error:true, errMessage:err.message};
    }
}

module.exports ={Product, Update_Product}