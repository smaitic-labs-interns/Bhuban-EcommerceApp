const { v4: uuidv4 } = require('uuid');


const Product = ({category, model, brand, description, price, quantity, rating}) => {
    return{
        id: uuidv4(),
        category,
        model,
        brand,
        description,
        price,
        quantity,
        rating
    }
}


const Update_Product = ({category, model, brand, description, price, quantity, rating}) => {
    return {category, model, brand, description, price, quantity, rating}
}

module.exports ={Product, Update_Product}