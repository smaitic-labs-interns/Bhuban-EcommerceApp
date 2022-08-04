const {v4: uuidv4} = require('uuid');
const Validate = require('../utils/validations');


const PAYMENT_TYPES = ['E-sewa', 'Khalti', 'CONNECT-IPS', 'CASH']
const SHIPMENT_TYPES = [
    {name: 'International', charge: 500},
    {name: 'Outside Valley', charge: 300},
    {name: 'Inside Valley', charge: 200},
    {name: 'Outside-RingRoad', charge: 150},
    {name: 'Inside- RIngRoad', charge: 100}
]


const Order = ({id,userId, products, total_bill}, shipping_address, paymentType, shipmentType) =>{
    const {error, value} = Validate.address_validation(shipping_address);
    if(error) throw error;
    
    if(!PAYMENT_TYPES.includes(paymentType)){
        throw new Error('Invalid Payment');
    }
    const paymentStatus = (paymentType === "CASH")? "Unpaid" : "paid";
    
    let shipment_charge = 0;
    for(SHIPMENT of SHIPMENT_TYPES){
        if(SHIPMENT.name === shipmentType){
            shipment_charge = SHIPMENT.charge;
            break;
        }
    }
    if(!shipment_charge){
        throw new Error(`Invalid Shipment`);  
    }

    return{
        id:uuidv4(),
        cartId:id,
        customerId: userId,
        products,
        total_bill: (total_bill+shipment_charge),
        shipping_address:value,
        payment:{type:paymentType, status: paymentStatus},
        shipment: {type: shipmentType, status: "review"},
        order_status: "requested"
    }
}


module.exports = {Order};