const express = require('express');
const router = express.Router()
router.use(express.json());
const Service = require('../service/allService');

const place_order = async(req, resp) => {
    try{
        const userId = req.params.id;
        const data = req.body;
        const res = await Service.order.place_order(userId, data.shippingAddress, data.paymentType, data.shipmentType);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

const update_quantity_order = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const data = req.body;
        const res = await Service.order.update_quantity_order(orderId, {productId: data.productId, quantity: data.quantity}, data.action);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const update_address = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const newAddress = req.body;
        const res = await Service.order.update_address(orderId, newAddress);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const update_payment = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const payment = req.body;
        const res = await Service.order.update_payment(orderId, payment);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const track_order = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const res = await Service.order.track_order(orderId);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const cancel_order = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const res = await Service.order.cancel_order(orderId);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const return_replace_order = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const data = req.body;
        const res = await Service.order.return_replace_order(orderId, data.action);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

const refund_updates = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const res = await Service.order.refund_updates(orderId);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    } 
}


const send_shipment_updates = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const res = await Service.order.send_shipment_updates(orderId);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const send_return_updates = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const res = await Service.order.send_return_updates(orderId);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}


const send_payment_updates = async(req, resp) => {
    try{
        const orderId = req.params.id;
        const res = await Service.order.send_payment_updates(orderId);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

module.exports = {place_order, update_quantity_order, update_address, update_payment, track_order, cancel_order, return_replace_order, refund_updates, send_shipment_updates, send_return_updates, send_payment_updates};

