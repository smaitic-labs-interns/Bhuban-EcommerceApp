const { v4: uuidv4 } = require("uuid");
const Validate = require("../utils/validations");

const Product = ({
  category,
  model,
  brand,
  description,
  price,
  quantity,
  images,
}) => {
  const { error, value } = Validate.product_validation({
    category,
    model,
    brand,
    description,
    price,
    quantity,
  });
  if (error) throw error;
  return {
    id: uuidv4(),
    category: value.category,
    model: value.model,
    brand: value.brand,
    description: value.description,
    price: value.price,
    quantity: value.quantity,
    rating: 0,
    images: images,
  };
};

module.exports = { Product };
