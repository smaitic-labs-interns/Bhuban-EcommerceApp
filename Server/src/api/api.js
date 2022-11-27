const user = require("./userApi");
const product = require("./productApi");
const cart = require("./cartApi");
const order = require("./orderApi");
const extra = require("./address");
const mail = require("./mail");

module.exports = { user, product, cart, order, extra, mail };
