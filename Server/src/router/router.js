const router = require("express").Router();
const api = require("../api/api");

router.get("/", async (req, resp) => {
  resp.send("Hello!, This is from API Route.");
});

// for user
router.get("/user/all", api.user.get_all_user);
router.get("/user/one", api.user.get_one_user);
router.get("/user/limited", api.user.get_limited_user);
router.post("/user/register", api.user.user_register);
router.put("/user/update", api.user.update_user);
router.put("/user/updateRole", api.user.update_user_role);
router.post("/user/login", api.user.user_login);
router.delete("/user/remove", api.user.remove_user_by_id);

// for product
router.get("/product/all", api.product.get_all_product);
router.get("/product/limited", api.product.get_limited_product);
router.get("/product/one/:productId", api.product.get_product_by_id);
router.post("/product/add", api.product.add_product);
router.delete("/product/remove", api.product.remove_product);
router.put("/product/update", api.product.update_product);
router.get("/product/search/:keyword", api.product.search_products);
router.get("/product/revenueReport", api.product.revenue_report);
router.get("/product/arAgingReport", api.product.ar_aging_report);

// for product review
router.post("/review/add", api.reviews.add_review);
router.get("/review/all", api.reviews.get_all_reviews);
router.get("/review/limited", api.reviews.get_limited_reviews);
router.get("/review/one", api.reviews.get_reviews_by_id);
router.get("/review/allByOrderId", api.reviews.get_reviews_by_orderId);
router.get(
  "/review/limitedByOrderId",
  api.reviews.get_limited_reviews_by_orderId
);
router.get("/review/allByProductId", api.reviews.get_reviews_by_productId);
router.get(
  "/review/limitedByProductId",
  api.reviews.get_limited_reviews_by_productId
);
router.get(
  "/review/orderProductId",
  api.reviews.read_reviews_by_order_product_id
);
router.get("/review/rating", api.reviews.get_average_product_rating);
router.delete("/review/remove", api.reviews.remove_reviews_by_id);

// for cart
router.get("/cart/all/", api.cart.get_all_cart);
router.get("/cart/limited/", api.cart.get_limited_cart);
router.get("/cart/one/", api.cart.get_user_cart);
router.post("/cart/addProduct", api.cart.add_product_to_cart);
router.delete("/cart/removeProduct", api.cart.remove_product_from_cart);
router.put("/cart/updateQuantity", api.cart.update_quantity_in_cart);

// for order
router.get("/order/all", api.order.read_all_orders);
router.get("/order/limited", api.order.read_limited_orders);
router.get("/order/user", api.order.read_user_orders);
router.get("/order/userLimited", api.order.read_user_order_limited);
router.get("/order/one", api.order.read_order_by_id);
router.post("/order/place", api.order.place_order);
router.put("/order/updateQuantity", api.order.update_quantity_order);
router.put("/order/updateAddress", api.order.update_address);
router.put("/order/updatePayment", api.order.update_payment);
router.put("/order/updateStatus", api.order.update_status);
router.put("/order/updateShipment", api.order.update_shipment);
router.get("/order/track", api.order.track_order);
router.put("/order/cancel", api.order.cancel_order);
router.put("/order/returnReplace", api.order.return_replace_order);
router.get("/order/refundUpdates", api.order.refund_updates);
router.get("/order/shipmentUpdates", api.order.send_payment_updates);
router.get("/order/returnUpdates", api.order.send_return_updates);
router.get("/order/paymentupdates", api.order.send_payment_updates);

// for countries, states, districts
router.get("/address/countries", api.extra.read_all_countries);
router.get("/address/states", api.extra.read_all_states);
router.get("/address/districts", api.extra.read_all_districts);
router.get("/address/countryStates", api.extra.read_states_by_country_id);
router.get("/address/stateDistricts", api.extra.read_districts_by_state_id);

// send mail API
router.post("/mail/send", api.mail.send);

module.exports = router;
