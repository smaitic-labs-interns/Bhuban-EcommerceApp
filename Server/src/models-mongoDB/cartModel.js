const mongodb = require('mongodb');
const Cart = (userId) => {
    return{
        userId: new mongodb.ObjectId(userId),
        products:[],
        totalBill:0,
        status:"active"
    }
}

module.exports ={Cart};