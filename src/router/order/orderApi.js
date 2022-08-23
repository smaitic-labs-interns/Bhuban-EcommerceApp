const express = require('express');
const router = express.Router()
router.use(express.json());
const Service = require('../../service/allService');

router.post('/placeOrder/:id', async(req, resp) => {
    const userId = req.params.id;
    const data = req.body;
    const res = await Service.order.place_order(userId, data.shippingAddress, data.paymentType, data.shipmentType);
    resp.send(res);
});

router.put('/updateQuantityInOrder/:id', async(req, resp) => {
    const orderId = req.params.id;
    const data = req.body;
    const res = await Service.order.update_quantity_order(orderId, {productId: data.productId, quantity: data.quantity}, data.action);
    resp.send(res);
})

router.put('/updateAddress/:id', async(req, resp) => {
    const orderId = req.params.id;
    const newAddress = req.body;
    const res = await Service.order.update_address(orderId, newAddress);
    resp.send(res);
})

router.put('/updatePayment/:id', async(req, resp) => {
    const orderId = req.params.id;
    const payment = req.body;
    const res = await Service.order.update_payment(orderId, payment);
    resp.send(res);
})

router.get('/trackOrder/:id', async(req, resp) => {
    const orderId = req.params.id;
    const res = await Service.order.track_order(orderId);
    resp.send(res);
})

router.put('/cancelOrder/:id', async(req, resp) => {
    const orderId = req.params.id;
    const res = await Service.order.cancel_order(orderId);
    resp.send(res);
})

router.put('/returnReplaceOrder/:id', async(req, resp) => {
    const orderId = req.params.id;
    const data = req.body;
    const res = await Service.order.return_replace_order(orderId, data.action);
    resp.send(res);
})

router.get('/refundUpdates/:id', async(req, resp) => {
    const orderId = req.params.id;
    const res = await Service.order.refund_updates(orderId);
    resp.send(res);
})

router.get('/shipmentUpdates/:id', async(req, resp) => {
    const orderId = req.params.id;
    const res = await Service.order.send_shipment_updates(orderId);
    resp.send(res);
})

router.get('/returnUpdates/:id', async(req, resp) => {
    const orderId = req.params.id;
    const res = await Service.order.send_return_updates(orderId);
    resp.send(res);
})

router.get('/paymentupdates/:id', async(req, resp) => {
    const orderId = req.params.id;
    const res = await Service.order.send_payment_updates(orderId);
    resp.send(res);
})

module.exports = router;

