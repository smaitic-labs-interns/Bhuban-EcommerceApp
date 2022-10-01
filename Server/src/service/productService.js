const store = require("../repository/dbRepository");
const Schema = require("../models/productModel");
const Validate = require("../utils/validations");

/* Management: Add Product to file
@params
    1) productDetails: "Products with full details", productObject
@returns
    @if(added sucessfully)
        return success message
    @else
        return Error
*/
const add_product = async (
  category,
  model,
  brand,
  description,
  price,
  quantity,
  rating
) => {
  try {
    const product = Schema.Product({
      category,
      model,
      brand,
      description,
      price,
      quantity,
      rating,
    });
    if (await store.product.add_product(product)) {
      console.log("Product added to Database sucessfully");
      return "Product added to Database sucessfully";
    }
  } catch (err) {
    console.log(`${err.name} => ${err.message}`);
    throw err;
  }
};

const get_all_product = async () => {
  try {
    const products = await store.product.get_all_product();
    if (products) return products;
  } catch (err) {
    console.log(`${err.name} => ${err.message}`);
    throw err;
  }
};

const get_product_by_id = async (productId) => {
  try {
    const product = await store.product.find_product(productId);
    if (product) return product;
  } catch (err) {
    console.log(`${err.name} => ${err.message}`);
    throw err;
  }
};

// add_product("laptop", "Dell inspirion 5567", "dell", "Dell laptop ", 50000, 30, 4);
/*Management:  Remove Product from file
@params 
    1) productId: "Unique Id of that particular Project", uuid
@returns
    @if(removed sucessfully)
        return success message
    @else
        return Error
*/
const remove_product = async (productId) => {
  try {
    if (await store.product.delete_product(productId)) {
      console.log("Product removed sucessfully");
      return "Product removed sucessfully";
    }
  } catch (err) {
    console.log(`${err.name} => ${err.message}`);
    throw err;
  }
};

// remove_product("7b0999ce-c4db-4243-8e35-4cbd3d19e04d");

/*Management:  Update Product from file
@params
    1) productId: "Unique Id of that particular Project", uuid
    2) productDetails: "Product with full details", productObject
@returns
    @if(Updated sucessfully)
        return success message 
    @else
        return Error
*/
const update_product = async (
  productID,
  category,
  model,
  brand,
  description,
  price,
  quantity,
  rating
) => {
  try {
    const { error, value } = Validate.updating_product_validation({
      category,
      model,
      brand,
      description,
      price,
      quantity,
      rating,
    });
    if (error) throw error;
    if (await store.product.update_product(productID, value)) {
      console.log("Product updated sucessfully");
      return "Product updated sucessfully";
    }
  } catch (err) {
    console.log(`${err.name} => ${err.message}`);
    throw err;
  }
};
// update_product("fed0f0e2-3a16-488a-bb23-a0fa7b2840f9",category="Radio", model= "SY-324", brand = "Sony", description="Sony Radio With Smart Features", price="10000", quantity="30", rating="4.6");

/* Management: Prepare revenue report
@params 
    
*/
const prepare_revenue_report = () => {
  try {
  } catch (err) {
    console.log(`${err.name} => ${err.message}`);
    throw err;
  }
};

// Management: Prepare AR Aging report
const prepare_ar_aging_report = () => {
  try {
  } catch (err) {
    console.log(`${err.name} => ${err.message}`);
    throw err;
  }
};

/************* CUSTOMER FEATURES*****************/

/* Search Product
@params
    1. product: "Product Name", string
@returns
    @if(product found)
        return all_found_products
    @else
        return Error
*/
const search_products = async (keyword) => {
  try {
    keyword = keyword.replace(/\s+/g, " ").trim();
    if (keyword === "") throw new Error(`Please provide valid keyword`);
    const result = await store.product.search_product(keyword);
    return result;
  } catch (err) {
    throw err;
  }
};

// search_products("a");

module.exports = {
  get_all_product,
  get_product_by_id,
  add_product,
  remove_product,
  update_product,
  prepare_revenue_report,
  prepare_ar_aging_report,
  search_products,
};
