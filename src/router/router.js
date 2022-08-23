const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.API_PORT

const user = require("./user/userApi");
const product = require("./product/productApi");
const cart = require("./cart/cartApi");
const order = require("./order/orderApi");

app.use("/user", user);
app.use("/product", product);
app.use("/cart", cart);
app.use("/order", order);

app.get("/", async(req, resp) => {
    resp.send("Hello!, This is from root file: router.js")
})

app.listen(port, err=> {
    if(err){
        return console.log("ERROR" , err);
    }else{
        console.log(`Server Started for port: ${port}`);
    }
});