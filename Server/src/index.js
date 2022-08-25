require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.API_PORT || 8888;
const router = require('./router/router');

app.use(express.json());
app.use("/api", router);
// app.use("/api/user", router.user);
// app.use("/api/product", router.product);
// app.use("/api/cart", router.cart);
// app.use("/api/order", router.order);


app.get("/", async(req, resp) => {
    resp.send("Hello!, This is from root API")
})

app.listen(port, (err)=> {
    if(err){
        return console.log("ERROR" , err);
    }else{
        console.log(`Server Started on port: ${port}`);
    }
});

// database connections
// const con = require('../../config/postGres');
