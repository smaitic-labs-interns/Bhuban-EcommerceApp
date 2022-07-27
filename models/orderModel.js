const {v4: uuidv4} = require('uuid');

const Order = ({id, products, total_bill}, {country, province, city, ward, tole, house_no}, payment, shipment) =>{
    return{
        id:uuidv4(),
        customerId: id,
        products,
        total_bill,
        shipping_address: {country, province, city, ward, tole, house_no},
        payment,
        shipment
    }
}


module.exports = {Order};