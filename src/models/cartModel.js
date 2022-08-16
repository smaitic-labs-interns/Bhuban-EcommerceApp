const {v4: uuidv4} = require('uuid');

const Cart = (userId) => {
    return{
        _id:uuidv4(),
        userId:userId,
        products:[],
        totalBill:0,
        status:"active"
    }
}

module.exports ={Cart};