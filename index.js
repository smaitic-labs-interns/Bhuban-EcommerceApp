// const validate_data = require('./models/dataValidator');
const read_data = require('./database/readData');
// const write_data = require('./database/writeData');
// const create_user = require('./services/registerUser');
// const get_user_input = require('./utils/takingInput');
// const user_signin = require('./services/signIn');
const data_validation = require('./models/validationRule');
const {add_product_to_cart, search_product, update_quantity} = require('./services/product');
const update_address = require('./services/updateAddress');
// User Input
const data_to_read = ['firstName', 'middleName', 'lastName', 'address', 'email', 'password'];


const fileName = "user_data.json";
// const user_data = get_user_input(data_to_read) // take input through command line
const user_data = {
    "firstName": "Bhuban",
    "middleName": "Prasad",
    "lastName": "Yadav",
    "address": "Dhapakhel-23",
    "email": "yadav.bhuban.by@gmail.com",
    "password": "bhubany"
  }
// create_user(user_data, fileName); // Creating User


//**************FOR SIGN IN ******************/
const sign_in_details = {
    'email': "yadav.bhuban.by@gmail.com",
    'password': "bhubany"
}
let is_user_signin =false;
// user_signin(sign_in_details);



// ********************* Search Product ************
const products = read_data("./files/products.json");

// let searck_keyword = "Ipad";
// const res = search_product(searck_keyword, products);
// if(res){
//     console.log(res);
// }else{
//     console.log("Not Found");
// }

// ******************ADD PRODUCT TO CART ***************

const cart = {};
const total_bill = 0;
var item = {"item": "Ipad", "quty": 5};
var item1 = {"item": "Radio", "quty": 5};



add_product_to_cart(item, cart, products);
add_product_to_cart(item1, cart, products);

console.log(cart);
console.log(total_bill);

/*********************UPDATE quantity to order*********** */
var item = {"item": "Ipad", "quty": 5, "action": "add"};
update_quantity(cart, item)
console.log(cart);

//******************** ADD / UPdate Address*****************/
const shipping_addresss = {
    "country": "Nepal",
    "Province": 3,
    "City"    : "abc",
    "Ward"    : 23,
    "Tole"     : "xyz",
    "house_no"  : 12

}
modify_address = {
    "house_no" :38
}
update_address(modify_address, shipping_addresss);
console.log(shipping_addresss);
/*********************ADD/Update Payment Method ************/
/*********************Place Order ***********************/
/********************* Track order **********************/
/**********************Cancel ORDER *********************/
/**********************Return or replace order *********************/
/**********************Track refund Updates *********************/
