const user = require("./userService");
const product = require("./productService");
const cart = require("./cartService");
const order = require("./orderService");
const extra = require("./extra");
const mail = require("./mail.service");

module.exports = { user, product, order, cart, extra, mail };
