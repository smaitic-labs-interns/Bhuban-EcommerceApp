const update_address = (update_address, shipping_addresss) => {
    for (key in update_address){
        shipping_addresss[key] = update_address[key];
    }
}

module.exports = update_address;