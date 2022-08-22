const express = require('express');
const app = express();
require('dotenv').config();


app.use(express.json());
app.listen(process.env.API_PORT);

module.exports = app;