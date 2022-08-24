const productRouter = require("express").Router();
const api = require('../api/api');

productRouter.get("/", async(req, resp) => {
    resp.send("Hello!, This is from Product API.")
})

productRouter.post("/addProduct", api.product.add_product);
productRouter.delete("/removeProduct", api.product.remove_product);
productRouter.put("/updateProduct/:id", api.product.update_product);
productRouter.get("/revenueReport", api.product.revenue_report);
productRouter.get("/arAgingReport", api.product.ar_aging_report);
productRouter.get("/searchproducts/:keyword", api.product.search_products);


module.exports = productRouter;