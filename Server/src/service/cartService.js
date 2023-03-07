const Store = require("../repository/dbRepository");
const Schema = require("../models/cartModel");

const get_all_cart = async () => {
  try {
    const carts = await Store.cart.read_all_cart();
    if (carts) return carts;
  } catch (err) {
    throw err;
  }
};

const get_limited_cart = async ({ page, limit }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const carts = await Store.cart.get_limited_cart({
      page: newPage,
      limit: newLimit,
    });
    if (carts) return carts;
  } catch (err) {
    throw err;
  }
};

/* Add product to cart
@params
    1.cartId: Id of cart, unique for each customer
    2.product: "Product with productid and quantity", productObject
@returns
    @if(added sucessfully)
        return sucess
    @else
        return error
*/

const get_user_cart = async (userId) => {
  try {
    const user_res = await Store.user.find_user_from_id(userId);
    if (!user_res) throw new Error(`No user Found for ID: ${userId}`);
    const cart_res = await Store.cart.find_active_cart(userId);
    if (cart_res) return cart_res;
    throw new Error(`Error occurs Try adding Product in cart.`);
  } catch (err) {
    throw err;
  }
};

const add_product_to_cart = async (userId, product) => {
  try {
    const user_res = await Store.user.find_user_from_id(userId);
    if (!user_res) throw new Error(`No user Found for ID: ${userId}`);
    const cart_res = await Store.cart.find_active_cart(userId);
    const product_res = await Store.product.find_product(product.productId);
    if (!product_res || product.quantity > product_res.quantity)
      throw new Error(`Not sufficient product on store`);
    //cart is present
    if (cart_res) {
      for (var oldProduct of cart_res.products) {
        // if item already available in cart
        if (oldProduct.productId === product.productId) {
          oldProduct.quantity += product.quantity;
          cart_res.totalBill += product.quantity * product_res.price;
          if (Store.cart.update_cart(cart_res)) {
            return "Product added Sucessfully";
          }
          throw new Error(`Error occurs try again later`);
        }
      }
      // cart is present but item is new
      cart_res.products.push({ ...product });
      cart_res.totalBill += product.quantity * product_res.price;
      if (await Store.cart.update_cart(cart_res)) {
        return "Product added Sucessfully";
      }
      throw new Error(`Error occurs try again later`);
    }
    // creating new cart
    const cart = Schema.Cart(userId);
    cart.products.push({ ...product });
    cart.totalBill += product.quantity * product_res.price;
    if (await Store.cart.add_cart(cart)) {
      return `Added to cart Sucessfully`;
    }
    throw new Error(`Error occurs try again later`);
  } catch (err) {
    throw err;
  }
};

const remove_product_from_cart = async (userId, productId) => {
  try {
    const user_res = await Store.user.find_user_from_id(userId);
    if (!user_res) throw new Error(`No user Found for ID: ${userId}`);
    const cart_res = await Store.cart.find_active_cart(userId);
    if (cart_res) {
      for (var oldProduct of cart_res.products) {
        if (oldProduct.productId === productId) {
          const product_res = await Store.product.find_product(productId);
          cart_res.totalBill -= oldProduct.quantity * product_res.price;
          cart_res.products = [];

          if (
            (await Store.cart.remove_product_from_cart(
              cart_res.id,
              productId
            )) &&
            (await Store.cart.update_cart(cart_res))
          ) {
            return `Product removed Sucessfully presented on ID: ${productId}`;
          }
          throw new Error(
            `Error occurs on removing product: ${productId}. Try again later!`
          );
        }
      }
      throw new Error(`No product exists on Cart for ID: ${productId}`);
    }
    throw new Error(`No active cart found for Id: ${userId}`);
  } catch (err) {
    throw err;
  }
};

/* Update quantity in cart
@params
    1.cartId: unique Id of cart
    2.product: "Product with productId and quantity", productObject
    3. action: "to be performed i.e add/remove"
@returns
    @if(updated sucessfully)
        return sucess
    @else
        return error
*/
const update_quantity_in_cart = async (userId, product, action) => {
  try {
    const cart_res = await Store.cart.find_active_cart(userId);
    if (cart_res.status !== "active")
      throw new Error(`No active cart found for Id: ${userId}`);
    const product_res = await Store.product.find_product(product.productId);

    if (product.quantity <= 0) {
      throw new Error(`Qyantity must be greater than 0`);
    }

    switch (action) {
      case "add":
        if (product.quantity <= product_res.quantity) {
          for (var oldProduct of cart_res.products) {
            if (oldProduct.productId === product.productId) {
              oldProduct.quantity += product.quantity;
              cart_res.totalBill += product.quantity * product_res.price;
              if (await Store.cart.update_cart(cart_res)) {
                return "Product added to cart Sucessfully";
              }
            }
          }
          throw new Error(
            `No product found in order to update for ID: ${product.productId}`
          );
        }
        throw new Error(
          `Entered number of quantity is not sufficient in store`
        );

      case "remove":
        for (var oldProduct of cart_res.products) {
          if (
            oldProduct.productId === product.productId &&
            product.quantity <= oldProduct.quantity
          ) {
            oldProduct.quantity -= product.quantity;
            cart_res.totalBill -= product.quantity * product_res.price;
            if (await Store.cart.update_cart(cart_res)) {
              return "Product removed from cart Sucessfully";
            }
            throw new Error(`Error occurs removing from cart. Try again later`);
          }
        }
        throw new Error(
          `Entered number of quantity is greater than quantity in cart`
        );

      default:
        throw new Error(`Invalid action to be performed: ${action}`);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  get_all_cart,
  get_limited_cart,
  get_user_cart,
  add_product_to_cart,
  remove_product_from_cart,
  update_quantity_in_cart,
};
