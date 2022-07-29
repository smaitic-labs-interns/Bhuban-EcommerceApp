const Cart = (cartId) => {
    return{
        id:cartId,
        products:[],
        total_bill:0
    }
}

module.exports ={Cart};