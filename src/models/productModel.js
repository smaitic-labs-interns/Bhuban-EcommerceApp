const { v4: uuidv4 } = require('uuid');
const Validate = require('../utils/validations');


const Product = ({category, model, brand, description, price, quantity, rating}) => {
    const {error, value} = Validate.product_validation({category, model, brand, description, price, quantity, rating});
    if(error) throw error;
    return{
        id: uuidv4(),
        category: value.category,
        model: value.model,
        brand: value.brand,
        description: value.description,
        price: value.price,
        quantity: value.quantity,
        rating: value.rating
    }
}


// const Update_Product = ({category, model, brand, description, price, quantity, rating}) => {
//     return {category, model, brand, description, price, quantity, rating}
// }

module.exports ={Product}