const router = require("express").Router();
const api = require('../api/api');

router.get("/", async(req, resp) => {
    resp.send("Hello!, This is from cart API.")
});


// for user
router.post("/user/userRegister", api.user.user_register);
router.post("/user/userLogin", api.user.user_login);

// for product
router.post("/product/addProduct", api.product.add_product);
router.delete("/product/removeProduct", api.product.remove_product);
router.put("/product/updateProduct", api.product.update_product);
router.get("/product/revenueReport", api.product.revenue_report);
router.get("/product/arAgingReport", api.product.ar_aging_report);
router.get("/product/searchProducts/:keyword", api.product.search_products);

// for cart
router.post("/cart/addProductToCart", api.cart.add_product_to_cart);
router.put("/cart/updateQuantityInCart", api.cart.update_quantity_in_cart);


// for order
router.post("/order/placeOrder", api.order.place_order);
router.put("/order/updateQuantityInOrder", api.order.update_quantity_order);
router.put("/order/updateAddress", api.order.update_address);
router.put("/order/updatePayment", api.order.update_payment);
router.get("/order/trackOrder", api.order.track_order);
router.put("/order/cancelOrder", api.order.cancel_order);
router.put("/order/returnReplaceOrder", api.order.return_replace_order);
router.get("/order/refundUpdates", api.order.refund_updates);
router.get("/order/shipmentUpdates", api.order.send_payment_updates);
router.get("/order/returnUpdates", api.order.send_return_updates);
router.get("/order/paymentupdates", api.order.send_payment_updates);

module.exports = router;