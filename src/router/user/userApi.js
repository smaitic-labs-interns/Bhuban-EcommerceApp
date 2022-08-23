const express = require('express');
const router = express.Router()
router.use(express.json());
const Service = require('../../service/allService');


router.post('/userRegister', async(req, resp) => {
    const data = req.body
    const res = await Service.user.user_register(data.firstName, data.middleName, data.lastName, data.address, data.email, data.password);
    resp.send(res);
});

router.post('/userLogin', async(req, resp) => {
    const data = req.body
    const res = await Service.user.user_signin(data.email, data.password);
    resp.send(res);
})


module.exports = router;