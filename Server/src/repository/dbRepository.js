const user = require("./userRepository");
const order = require("./orderRepository");
const product = require("./productRepository");
const cart = require("./cartRepository");
const extra = require("./extra");

module.exports = { user, product, order, cart, extra };
