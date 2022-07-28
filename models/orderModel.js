const {v4: uuidv4} = require('uuid');

const Payment = () => {

}

const Order = ({id, products, total_bill}, shipping_address, payment, shipment) =>{
    return{
        id:uuidv4(),
        customerId: id,
        products,
        total_bill,
        shipping_address,
        payment,
        shipment
    }
}


module.exports = {Order, Payment};