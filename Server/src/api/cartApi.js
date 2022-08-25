const express = require('express');
const router = express.Router()
router.use(express.json());

const Service = require('../service/allService');

const add_product_to_cart = async(req, resp) => {
    try{
        const userId = req.params.id;
        const product = req.body;
        const res = await Service.cart.add_product_to_cart(userId, product);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

const update_quantity_in_cart = async(req, resp) => {
    try{
        const userId = req.params.id;
        const data = req.body;
        const res = await Service.cart.update_quantity_in_cart(userId, {productId: data.productId, quantity: data.quantity}, data.action);
        resp.send(res);
    }catch(err){
        resp.send(err.message);
    }
}

module.exports = {add_product_to_cart, update_quantity_in_cart};