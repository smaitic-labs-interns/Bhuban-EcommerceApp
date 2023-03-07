const user = require("./userRepository");
const order = require("./orderRepository");
const product = require("./productRepository");
const cart = require("./cartRepository");
const extra = require("./address.repository");
const reviews = require("./reviews.repository");

module.exports = { user, product, order, cart, extra, reviews };
