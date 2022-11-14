const express = require('express');
const router = express.Router()
router.use(express.json());
const Service = require('../service/allService');


const user_register = async(req, resp) => {
    try{
        const data = req.body
        const res = await Service.user.user_register(data.firstName, data.middleName, data.lastName, data.address, data.email, data.password);
        resp.status(200).send(res);
    }catch(err){
        resp.status(400).send(err.message);
    }
}

const user_login = async(req, resp) => {
    try{
        const data = req.body
        console.log(req.headers);
        const res = await Service.user.user_signin(data.email, data.password);
        resp.status(200).send(res);
    }catch(err){
        resp.status(400).send(err.message);
    }
}

module.exports = {user_register, user_login};