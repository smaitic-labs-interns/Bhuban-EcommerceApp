const user = require("./userService");
const product = require("./productService");
const cart = require("./cartService");
const order = require("./orderService");
const extra = require("./address.service");
const mail = require("./mail.service");
const reviews = require("./reviews.service");

module.exports = { user, product, order, cart, extra, mail, reviews };
