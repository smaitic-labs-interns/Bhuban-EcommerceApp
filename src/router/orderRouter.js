const orderRouter = require("express").Router();
const api = require('../api/api');

orderRouter.get("/", async(req, resp) => {
    resp.send("Hello!, This is from order API.")
})

orderRouter.post("/placeOrder/:id", api.order.place_order);
orderRouter.put("/updateQuantityInOrder/:id", api.order.update_quantity_order);
orderRouter.put("/updateAddress/:id", api.order.update_address);
orderRouter.put("/updatePayment/:id", api.order.update_payment);
orderRouter.get("/trackOrder/:id", api.order.track_order);
orderRouter.put("/cancelOrder/:id", api.order.cancel_order);
orderRouter.put("/returnReplaceOrder/:id", api.order.return_replace_order);
orderRouter.get("/refundUpdates/:id", api.order.refund_updates);
orderRouter.get("/shipmentUpdates/:id", api.order.send_payment_updates);
orderRouter.get("/returnUpdates/:id", api.order.send_return_updates);
orderRouter.get("/paymentupdates/:id", api.order.send_payment_updates);


module.exports = orderRouter;