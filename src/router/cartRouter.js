const cartRouter = require("express").Router();
const api = require('../api/api');

cartRouter.get("/", async(req, resp) => {
    resp.send("Hello!, This is from cart API.")
})

cartRouter.post("/addProductToCart/:id", api.cart.add_product_to_cart);
cartRouter.put("/updateQuantityInCart/:id", api.cart.update_quantity_in_cart);

module.exports = cartRouter;