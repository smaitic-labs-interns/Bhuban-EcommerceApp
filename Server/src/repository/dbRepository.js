const user = require("./userRepository");
const order = require("./orderRepository");
const product = require("./productRepository");
const cart = require("./cartRepository");
const extra = require("./address.repository");

module.exports = { user, product, order, cart, extra };
