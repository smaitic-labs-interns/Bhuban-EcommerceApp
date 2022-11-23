const { v4: uuidv4 } = require("uuid");
const Validate = require("../utils/validations");

const PAYMENT_TYPES = ["E-sewa", "Khalti", "CONNECT-IPS", "CASH"];

const SHIPMENT_TYPES = [
  { name: "International", charge: 500 },
  { name: "Outside Valley", charge: 300 },
  { name: "Inside Valley", charge: 200 },
  { name: "Outside-RingRoad", charge: 150 },
  { name: "Inside- RIngRoad", charge: 100 },
];

const Order = (
  { userId, products, totalBill },
  shippingAddress,
  paymentType,
  shipmentType
) => {
  const { error, value } = Validate.address_validation(shippingAddress);
  if (error) throw error;

  if (!PAYMENT_TYPES.includes(paymentType)) {
    throw new Error("Invalid Payment");
  }
  const paymentStatus = paymentType === "CASH" ? "Unpaid" : "paid";

  let shipmentCharge = 0;
  for (SHIPMENT of SHIPMENT_TYPES) {
    if (SHIPMENT.name === shipmentType) {
      shipmentCharge = SHIPMENT.charge;
      break;
    }
  }
  if (!shipmentCharge) {
    throw new Error(`Invalid Shipment`);
  }

  return {
    id: uuidv4(),
    userId,
    products,
    totalBill: totalBill + shipmentCharge,
    shippingAddress: value,
    payment: { type: paymentType, status: paymentStatus },
    shipment: { type: shipmentType, status: "review" },
    orderStatus: "pending",
  };
};

module.exports = { Order };
