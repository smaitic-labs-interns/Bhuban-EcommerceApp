require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.API_PORT || 8888;
const router = require("./router/router");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.static(path.resolve("public")));
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", async (req, resp) => {
  resp.send("Hello!, This is from root API");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  } else {
    console.log(`Server Started on port: ${port}`);
  }
});

// database connections
// const con = require('../../config/postGres');
