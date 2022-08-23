const express = require('express');
const router = express.Router()
router.use(express.json());
const Service = require('../../service/allService');

router.post('/addProduct', async(req, resp) => {
    const data = req.body;
    const res = await Service.product.add_product(data.category, data.model, data.brand, data.description, data.price, data.quantity, data.rating);
    resp.send(res);
});

router.delete('/removeProduct/:id', async(req, resp) => {
    const productId = req.params.id;
    const res = await Service.product.remove_product(productId);
    resp.send(res);
})

router.put('/updateProduct/:id', async(req, resp) => {
    const productId = req.params.id;
    const data = req.body;
    console.log(data.category);
    const res = await Service.product.update_product(productId, data.category, data.model, data.brand, data.description, data.price, data.quantity, data.rating);
    resp.send(res);
})

router.get('/revenueReport', async(req, resp) => {
    resp.send("Working Good from revenue-report");
})

router.get('/arAging', async(req, resp) => {
    resp.send("Working good from Ar-aging");
})

router.get('/searchProducts/:keyword', async(req, resp) => {
    const keyword = req.params.keyword;
    const res = await Service.product.search_products(keyword);
    resp.send(res);
})

module.exports = router;