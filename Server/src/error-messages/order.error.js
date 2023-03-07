const validate_shipment_Ac_order_status = (orderStatus) => {
  var message = {
    pending: "Order is still in pending state, cannot update shipment",
    accepted: "Order is only accepted not shipped, cannot update shipment",
    "in-progress": "Order is still on in-progress, cannot update shipment",
    completed: "Order has been Completed,  cannot update shipment",
    cancelled: "Order has been cancelled, cannot update shipment",
    failed: "Order has been failed, cannot update shipment",
  };
  if (Object.keys(message).includes(orderStatus)) {
    throw new Error(message[orderStatus]);
  }
  return true;
};

const validate_order_status_for_cancelled = (orderStatus) => {
  var message = {
    shipped:
      "Order has been shipped,  Cannot be cancelled from here, visit nearest center",
    delivered:
      "Order has been Delivered,  Cannot be cancelled from here, visit nearest center",
    "in-progress": "Order is still on in-progress, cannot update shipment",
    completed:
      "Order has been Completed,  Cannot be cancelled from here, visit nearest center",
  };
  if (Object.keys(message).includes(orderStatus)) {
    throw new Error(message[orderStatus]);
  }
  return true;
};

const validate_order_status_for_delivered = (shipmentStatus) => {
  var message = {
    pending: "Shipment is in pending state,  Cannot marked as delivered",
    "pre-transit":
      "Shipment is in pre-transit state,  Cannot marked as delivered",
    "in-transit":
      "Shipment is in in-transit state,  Cannot marked as delivered",
    "waiting-for-delivery":
      "Shipment is in waiting-for-delivery state,  Cannot marked as delivered",
    "out-of-delivery":
      "Shipment is in out-of-delivery state,  Cannot marked as delivered",
    "failed-attempt":
      "Shipment is in failed-attempt state,  Cannot marked as delivered",
  };
  if (Object.keys(message).includes(shipmentStatus)) {
    throw new Error(message[shipmentStatus]);
  }
  return true;
};

const validate_order_status_for_completed = (shipmentStatus) => {
  var message = {
    pending: "Shipment is in pending state,  Cannot marked as completed",
    "pre-transit":
      "Shipment is in pre-transit state,  Cannot marked as completed",
    "in-transit":
      "Shipment is in in-transit state,  Cannot marked as completed",
    "waiting-for-delivery":
      "Shipment is in waiting-for-delivery state,  Cannot marked as completed",
    "out-of-delivery":
      "Shipment is in out-of-delivery state,  Cannot marked as completed",
    returned: "Shipment is in returned state,  Cannot marked as completed",
    replaced: "Shipment is in replaced state,  Cannot marked as completed",
    "failed-attempt":
      "Shipment is in failed-attempt state,  Cannot marked as completed",
  };
  if (Object.keys(message).includes(shipmentStatus)) {
    throw new Error(message[shipmentStatus]);
  }
  return true;
};

module.exports = {
  validate_shipment_Ac_order_status,
  validate_order_status_for_cancelled,
  validate_order_status_for_delivered,
  validate_order_status_for_completed,
};
