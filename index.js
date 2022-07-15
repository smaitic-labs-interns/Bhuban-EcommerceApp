const product = require('./services/product');
const user = require('./services/users');

//1.signUp
const data_to_read = ['firstName', 'middleName', 'lastName', 'address', 'email', 'password'];
// const user_data = get_user_input(data_to_read) // take input through command line
const user_data = {"firstName": "Bhuban", "middleName": "Prasad", "lastName": "Yadav", "address": "Dhapakhel-23", "email": "yadav.bhuban.by@gmail.com", "password": "bhubany"};
// user.create_user(user_data);


//2.Sign in
const sign_in_details = {'email': "yadav.bhuban.by@gmail.com",'password': "bhubany"};
// user.user_signin(sign_in_details);



//3. Search Product
let searck_keyword = "Ipad";
// const res = product.search_product(searck_keyword);
// console.log( res ? res : `No result found for : ${searck_keyword}`);


//4. Add to cart

const cart = {"cart_id": 1, "products":[] , "total_bill":0};
var item = {"item": "Ipad", "quty": 5};
var item1 = {"item": "Radio", "quty": 5};
// product.add_product_to_cart(item, cart);
// product.add_product_to_cart(item1, cart);
// console.log(cart);



// 5. modify quantity
var item3 = {"item": "Ipad", "quty": 5, "action": "add"};
// product.update_quantity_in_cart(cart, item3);
// console.log(cart);


// 6. place order

const shipping_addresss = {"country": "Nepal","Province": 3,"City": "abc","Ward": 23, "Tole": "xyz","house_no"  : 12, "to": "CustomerName"};
const payment ={"type": "cash", "status": "on delivery"};
// console.log(product.place_order(cart, shipping_addresss, payment));

//7. add/update address

const modify_address = {"house_no" :18, "City": "Dhapakhel"};
// product.update_address("CustomerName", modify_address);


//8. add/update payment
const modify_payment = {"type": "Online - Esewa", "status": "Payment Done"};
// product.update_payment("CustomerName", modify_payment);


//9. track order
// const order_details = product.track_order("CustomerName");
// console.log( order_details ? order_details : `No result found for : ${`CustomerName`}`);

//10. Cancel Order
const order_status = product.cancel_order("CustomerName");
console.log( order_status ? order_status : `No result found for : ${`CustomerName`}`);

//11. Return or replace order

/**********************Track refund Updates *********************/
