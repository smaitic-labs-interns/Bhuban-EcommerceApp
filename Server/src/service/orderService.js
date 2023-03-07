const Store = require("../repository/dbRepository");
const Validate = require("../utils/validations");
const Schema = require("../models/orderModel");
const AddressSchema = require("../models/addressModule");
const mail = require("../utils/nodeMailer");

const Order = require("../error-messages/order.error");

/**
 * * Read all orders
 * @returns Array of Orders Object || error message
 */
const read_all_orders = async () => {
  try {
    const order = await Store.order.read_all_orders();
    if (order) return order;
    throw new Error("Error occurs fetching orders");
  } catch (err) {
    throw err;
  }
};

/**
 * * Read orders from page(number) to (number)
 * @param {page, limit} param0
 * @returns Array of orders Object || error message
 */
const read_limited_orders = async ({ page, limit }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const order = await Store.order.read_limited_orders({
      page: newPage,
      limit: newLimit,
    });
    if (order) return order;
    throw new Error("Error occurs fetching orders");
  } catch (err) {
    throw err;
  }
};

/**
 * *Read user orders.
 * @param {*} userId
 * @returns Array of orders object || error message
 */
const read_user_orders = async (userId) => {
  try {
    const order = await Store.order.read_user_orders(userId);
    if (order.length !== 0) return order;
    throw new Error("Error occurs fetching user orders");
  } catch (err) {
    throw err;
  }
};

/**
 * * Read limited user orders
 * @param {userId, page, limit} param0
 * @returns order Object || error message
 */

const read_user_order_limited = async ({ userId, page, limit }) => {
  try {
    newPage = parseInt(page) === 0 ? 1 : parseInt(page);
    newLimit = parseInt(limit) === 0 ? 1 : parseInt(limit);
    const order = await Store.order.read_user_order_limited({
      userId: userId,
      page: newPage,
      limit: newLimit,
    });
    if (order.length !== 0) return order;
    throw new Error("Error occurs fetching user orders");
  } catch (err) {
    throw err;
  }
};

/**
 * *Read Order using orderId
 * @param {*} orderId
 * @returns order || error message
 */

const read_order_by_id = async (orderId) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    if (order) return order;
    throw new Error(`Error occurs fetching  order on ID: ${orderId}`);
  } catch (err) {
    throw err;
  }
};

/* Place order
@params
    1) cartId: "cartId where products are placed",
    2) Shipping_address: "Address of customer", addressObject
    3) payments: "Payments Details", paymentObject
@returns
    @if(placed order sucessfully)
        return order_details
    @else
        return error
*/

const place_order = async (
  userId,
  shippingAddress,
  paymentType,
  shipmentType
) => {
  try {
    const cart = await Store.cart.find_active_cart(userId);
    if (!cart) throw new Error(`No active cart Found for User Id: ${userId}`);
    cart.products.map(async (product) => {
      const res = await Store.product.find_product(product.productId);
      if (product.quantity > res.quantity) {
        throw new Error(
          `Not sufficient quantity on the store for product ID : ${product.productId}`
        );
      }
    });
    const address = AddressSchema.Address(shippingAddress);
    const order = Schema.Order(cart, address, paymentType, shipmentType);

    if (await Store.order.place_order(order)) {
      const updCartSts = await Store.cart.update_cart_status(
        cart.id,
        "deactive"
      ); // change status of cart or delete cart
      for (product of cart.products) {
        await Store.product.update_quantity(
          product.productId,
          product.quantity,
          "decrease"
        );
      }
      if (updCartSts) return `Your order has been placed`;
    }
    throw new Error("Error Occurs placing Order, Try again later!");
  } catch (err) {
    throw err;
  }
};

/**
 * *Update Order Quantity
 * @param {*} orderId
 * @param {productId, quantity} product
 * @param {add||remove} action
 * @returns success/error message
 */

const update_quantity_order = async (orderId, product, action) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    if (order.orderStatus !== "pending" && order.orderStatus !== "review") {
      throw new Error("Cannot update quantity, order has passed from step1");
    }
    const product_res = await Store.product.find_product(product.productId);

    switch (action) {
      case "add":
        if (product.quantity <= product_res.quantity) {
          for (var oldProduct of order.products) {
            if (oldProduct.productId === product.productId) {
              oldProduct.quantity += product.quantity;
              order.totalBill += product.quantity * product_res.price;
              let updRes = await Store.product.update_quantity(
                product.productId,
                product.quantity,
                "decrease"
              );
              if (updRes && (await Store.order.update_order(orderId, order))) {
                return "Quantity in order has been added sucessfully";
              }
              throw new Error(`Error Occurs while Placing Order`);
            }
          }
          throw new Error(
            `No product found for ID: ${product.productId} on order  ID: ${orderId}`
          );
        }
        throw new Error(
          `Entered number of quantity is not sufficient in store`
        );

      case "remove":
        for (var oldProduct of order.products) {
          if (
            oldProduct.productId === product.productId &&
            product.quantity <= oldProduct.quantity
          ) {
            oldProduct.quantity -= product.quantity;
            order.totalBill -= product.quantity * product_res.price;
            let updRes = await Store.product.update_quantity(
              product.productId,
              product.quantity,
              "increase"
            );

            if (updRes && (await Store.order.update_order(orderId, order))) {
              console.log("Quantity from order has been decreased sucessfully");
              return "Quantity from order has been decreased sucessfully";
            }
            throw new Error(`Error Occurs while Placing Order`);
          }
        }
        throw new Error(
          `Entered quantity must be lessthan or equal to orderd quantity.`
        );
    }
  } catch (err) {
    throw err;
  }
};

/* Update Address
@params
    1) orderId : Unique Id of order,
    2) new_address: object containing new address, addressObject
@returns
    @if(sucessfully update)
        returns updated address
    @else
        return error
*/
const update_address = async (orderId, newAddress) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    if (order.orderStatus !== "pending") {
      throw new Error("Cannot update quantity, order has passed from step1");
    }
    const { error, value } = Validate.Updatable_address_validation(newAddress);
    if (error) throw error;
    const address = value;
    for (key in address) {
      if (address[key].length !== 0) {
        order.shippingAddress[key] = address[key];
      }
    }
    if (Store.order.update_order(orderId, order)) {
      console.log("Address Updated Sucessfully");
      return "Address Updated Sucessfully";
    }
  } catch (err) {
    throw err;
  }
};

/**
 * *Update Payment 
@params
    1) orderId: Unique Id,
    2) new_payment: Object containing payment details, paymentObject
@returns
    @if(Sucessful updated)
        return sucess_message
    @else
        return error
*/
const update_payment = async (orderId, newPayment) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    const PAYMENT_TYPES = ["E-sewa", "Khalti", "CONNECT-IPS", "CASH"];

    if (order.orderStatus === "cancelled") {
      throw new Error(
        "Error Occur Updating Payment (Order has been cancelled)"
      );
    } else if (order.orderStatus === "refund") {
      throw new Error(
        "Error Occur Updating Payment (Order has Placed For refund)"
      );
    }

    if (!PAYMENT_TYPES.includes(newPayment.type)) {
      throw new Error("Invalid Payment");
    }
    order.payment = newPayment;

    if (Store.order.update_order(orderId, order)) {
      return "Payment Updated Sucessfully";
    }
  } catch (err) {
    throw err;
  }
};

/**
 * *Update Order Status
 * @param {*} orderId
 * @param {*} status
 * @returns success || error message
 */

const update_order_status = async (orderId, status) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    const ORDER_STATUS = [
      "pending",
      "accepted",
      "in-progress",
      "shipped",
      "failed",
      "delivered",
      "cancelled",
      "completed",
    ];

    if (!ORDER_STATUS.includes(status)) {
      throw new Error("Invalid Order Status");
    } else if (status === "cancelled") {
      Order.validate_order_status_for_cancelled(order.orderStatus);
      if (order.shipment.status === "delivered") {
        throw new Error(`Shipment has been completed, cannot cancel the order`);
      }
    } else if (status === "delivered") {
      Order.validate_order_status_for_delivered(order.shipment.status);
    } else if (status === "completed") {
      Order.validate_order_status_for_completed(order.shipment.status);
    } else if (
      ORDER_STATUS.indexOf(status) < ORDER_STATUS.indexOf(order.orderStatus)
    ) {
      throw new Error(
        `Order is in ${order.orderStatus} state, Cannot downgrade now`
      );
    }

    order.orderStatus = status;
    if (Store.order.update_order(orderId, order)) {
      return `Order Status Updated Sucessfully. New Status: (${status})`;
    }
    throw new Error("Error Occurs Updating Status");
  } catch (err) {
    throw err;
  }
};

/**
 * *Update Shipment Status
 * @param {*} orderId
 * @param {*} shipment
 * @returns success || error message
 */
const update_shipment = async (orderId, shipment) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    const SHIPMENT_STATUS = [
      "pending",
      "pre-transit",
      "in-transit",
      "waiting-for-delivery",
      "out-of-delivery",
      "failed-attempt",
      "delivered",
      "replaced",
      "returned",
    ];

    if (!SHIPMENT_STATUS.includes(shipment.status)) {
      throw new Error("Invalid Shipment Status");
    } else if (
      SHIPMENT_STATUS.indexOf(shipment.status) <
      SHIPMENT_STATUS.indexOf(order.shipment.status)
    ) {
      throw new Error(
        `Shipment is in ${order.shipment.status} state, Cannot downgrade now`
      );
    }
    if (Order.validate_shipment_Ac_order_status(order.orderStatus)) {
      order.shipment = shipment;

      if (Store.order.update_order(orderId, order)) {
        return `Shipment Updated Sucessfully. New Shipment :\n type: ${shipment.type}, status: ${shipment.status}`;
      }
    }
    throw new Error("Error Occurs Updating Shipment");
  } catch (err) {
    throw err;
  }
};

/* track Order 
@params
    1) orderId: "Unique Id"
@returns
    @if(order found)
        return status
    @else
        return error
*/
const track_order = async (orderId) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    console.log(
      `Type: ${order.shipment.type}, Status : ${order.shipment.status}`
    );
    return order.shipment;
  } catch (err) {
    throw err;
  }
};

/* Cancel Order  
@param
    1) orderId: "Unique ID"
@returns
    @if(order cancelled sucessfully)
        return status
    @else
        return error
*/

const cancel_order = async (orderId) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    if (order.orderStatus === "cancelled") {
      throw new Error(`Already Placed for cancelled. Id: ${orderId}`);
    }
    for (product of order.products) {
      if (
        !Store.product.update_quantity(
          product.productId,
          product.quantity,
          "increase"
        )
      ) {
        throw new Error(`Error occurs adding cancelled product in store`);
      }
    }
    order.orderStatus = "cancelled";

    if (Store.order.update_order(orderId, order)) {
      return "Order has been placed for cancellation";
    }
  } catch (err) {
    throw err;
  }
};

/**
 * *return replace Order  
@param
    1) orderId : "Unique ID"
    2) action  : either replace or return
@returns
    @if(order replace/return sucessfully)
        return status
    @else
        return error
*/
const return_replace_order = async (orderId, action) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);

    if (order.orderStatus === "cancelled") {
      throw new Error(
        `Order is already Placed for cancellation. Id: ${orderId}`
      );
    }
    if (order.orderStatus === "return") {
      throw new Error(`Already Placed for return. Id: ${orderId}`);
    }

    if (action === "returned") {
      for (product of order.products) {
        Store.product.update_quantity(
          product.productId,
          product.quantity,
          "increase"
        );
      }
    }
    if (await update_shipment(orderId, { ...order.shipment, status: action })) {
      return `Your order has been placed for ${action} Sucessfully`;
    }
  } catch (err) {
    throw err;
  }
};

/* Track refund updates 
@params
    1) orderId: "Unique ID"
@returns
    @if(order found)
        return refund status
    @else
        return error
*/
const refund_updates = async (orderId) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    if (order.orderStatus === "refund") {
      console.log(
        `Type: ${order.payment.type}, Status : ${order.payment.status}`
      );
      return order.payment;
    }
    throw new Error(`No refund order found for ID:  "${orderId}"`);
  } catch (err) {
    throw err;
  }
};

/* Management: Send shipment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return order status 
    @else
        return error
*/
const send_shipment_updates = async (orderId) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    const mailContent = {
      from: "Sales DEpartment",
      to: "bhuban.temp@gmail.com",
      subject: "Regarding ORDER Updates",
      text: `Type: ${order.shipment.type}, Status : ${order.shipment.status}`,
    };
    const res = await mail.send(mailContent);
    return order.shipment;
  } catch (err) {
    throw err;
  }
};

/* Management: Send return updates
@params
    1) orderId: "Unique order id"
@returns
    @if(order found)
        return order status
    @else
        return Error
*/
const send_return_updates = async (orderId) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    if (order.orderStatus === "return") {
      console.log(
        `Type: ${order.shipment.type}, Status : ${order.shipment.status}`
      );
      return order.shipment;
    }
    throw new Error(`No return order found for ID:  "${orderId}"`);
  } catch (err) {
    throw err;
  }
};

/* Management: Send Payment updates
@params
    1) orderId: "Unique order Id"
@returns
    @if(order found)
        return payment status
    @else
        return Error
    */
const send_payment_updates = async (orderId) => {
  try {
    const order = await Store.order.read_order_from_id(orderId);
    console.log(
      `Type: ${order.payment.type}, Status : ${order.payment.status}`
    );
    return order.payment;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  read_all_orders,
  read_limited_orders,
  read_user_orders,
  place_order,
  read_order_by_id,
  read_user_order_limited,
  update_quantity_order,
  update_address,
  update_payment,
  update_order_status,
  update_shipment,
  track_order,
  cancel_order,
  return_replace_order,
  refund_updates,
  send_shipment_updates,
  send_return_updates,
  send_payment_updates,
};
