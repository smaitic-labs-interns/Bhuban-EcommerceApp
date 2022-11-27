const { v4: uuidv4 } = require("uuid");
const Validate = require("../utils/validations");

const Product = ({
  category,
  model,
  brand,
  name,
  description,
  price,
  quantity,
  addedBy,
  images,
}) => {
  const { error, value } = Validate.product_validation({
    category,
    model,
    brand,
    name,
    description,
    price,
    quantity,
    addedBy,
  });
  if (error) throw error;
  return {
    id: uuidv4(),
    category: value.category,
    model: value.model,
    brand: value.brand,
    name: value.name,
    description: value.description,
    price: value.price,
    quantity: value.quantity,
    addedBy: value.addedBy,
    images: images,
  };
};

module.exports = { Product };
