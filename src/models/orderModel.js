const {v4: uuidv4} = require('uuid');
const Validate = require('../utils/validations');


const Payment = () => {

}

const Order = ({id, products, total_bill}, shipping_address, payment, shipment) =>{
    const {error, value} = Validate.address_validation({shipping_address});
    if(error) throw error;
    return{
        id:uuidv4(),
        customerId: id,
        products,
        total_bill,
        shipping_address:value,
        payment,
        shipment
    }
}


module.exports = {Order, Payment};