import { register_reducer, loginReducer } from './userReducer';
import {
  productReducer,
  selectedProductReducer,
  addProductReducer,
  search_product_reducer,
  delete_product_reducer,
  update_product_reducer,
  fetch_limited_product_reducer,
} from './productReducer';
import {
  cartReducer,
  add_to_cart_reducer,
  update_cart_reducer,
  cart_products_details_reducer,
  remove_from_cart_reducer,
} from './cartReducer';
import { send_mail_reducer } from './mail.reducer';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import {
  all_order_reducer,
  user_orders_reducer,
  one_order_reducer,
  place_order_reducer,
  track_order_reducer,
  update_order_quantity_reducer,
  update_order_address_reducer,
  update_order_payment_reducer,
  cancel_order_reducer,
  return_replace_ord_reducer,
  refund_updates_reducer,
  shipment_updates_reducer,
  return_updates_reducer,
  payment_updates_reducer,
  update_order_status_reducer,
  placed_order_details_reducer,
  fetch_limited_order_reducer,
  fetch_limited_user_order_reducer,
} from './orderReducer';
import { all_countries, country_all_states, state_all_districts } from './address.reducer';

const persistConfig = {
  key: 'persist-store',
  storage,
  blacklist: [
    'register',
    'login',
    'searchProduct',
    'deleteProduct',
    'updateProduct',
    'cartProductsDetails',
    'addToCart',
    'removeFromCart',
    'updateCart',
    'allOrder',
    'limitedOrder',
    'userOrders',
    'limitedUserOrder',
    'oneOrder',
    'placeOrder',
    'updateOrderQuantity',
    'updateOrderAddress',
    'updateOrderPayment',
    'updateOrderStatus',
    'cancelOrder',
    'returnReplace',
    'refundUpdates',
    'shipmentUpdates',
    'returnUpdates',
    'paymentUpdates',
    'addProduct',
    'allCountries',
    'allStates',
    'allDistricts',
    'trackOrder',
    'sendMail',
  ],
};
const persistedReducer = persistCombineReducers(persistConfig, {
  register: persistReducer(
    {
      key: 'register',
      storage: storage,
      blacklist: ['loading', 'message'],
    },
    register_reducer,
  ),
  login: persistReducer(
    {
      key: 'login',
      storage: storage,
    },
    loginReducer,
  ),
  allProducts: productReducer,
  limitedProduct: persistReducer(
    {
      key: 'limitedProduct',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    fetch_limited_product_reducer,
  ),
  product: selectedProductReducer,
  addProduct: persistReducer(
    {
      key: 'addProduct',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    addProductReducer,
  ),
  searchProduct: persistReducer(
    {
      key: 'searchProduct',
      storage: storage,
      blacklist: ['products', 'status'],
    },
    search_product_reducer,
  ),
  deleteProduct: persistReducer(
    {
      key: 'deleteProduct',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    delete_product_reducer,
  ),
  updateProduct: persistReducer(
    {
      key: 'updateProduct',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    update_product_reducer,
  ),
  updateCart: persistReducer(
    {
      key: 'updateCart',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    update_cart_reducer,
  ),
  userCart: cartReducer,
  cartProductsDetails: persistReducer(
    {
      key: 'cartProductsDetails',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    cart_products_details_reducer,
  ),
  addToCart: persistReducer(
    {
      key: 'addToCart',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    add_to_cart_reducer,
  ),
  removeFromCart: persistReducer(
    {
      key: 'removeFromCart',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    remove_from_cart_reducer,
  ),
  allOrder: persistReducer(
    {
      key: 'allOrder',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    all_order_reducer,
  ),
  limitedOrder: persistReducer(
    {
      key: 'limitedOrder',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    fetch_limited_order_reducer,
  ),
  limitedUserOrder: persistReducer(
    {
      key: 'limitedUserOrder',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    fetch_limited_user_order_reducer,
  ),
  userOrders: persistReducer(
    {
      key: 'userOrders',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    user_orders_reducer,
  ),
  oneOrder: persistReducer(
    {
      key: 'oneOrder',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    one_order_reducer,
  ),
  placeOrder: persistReducer(
    {
      key: 'placeOrder',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    place_order_reducer,
  ),
  placedOrderDetails: persistReducer(
    {
      key: 'placedOrderDetails',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    placed_order_details_reducer,
  ),
  trackOrder: persistReducer(
    {
      key: 'trackOrder',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    track_order_reducer,
  ),
  updateOrderQuantity: persistReducer(
    {
      key: 'updateOrderQuantity',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    update_order_quantity_reducer,
  ),
  updateOrderAddress: persistReducer(
    {
      key: 'updateOrderAddress',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    update_order_address_reducer,
  ),
  updateOrderPayment: persistReducer(
    {
      key: 'updateOrderPayment',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    update_order_payment_reducer,
  ),
  updateOrderStatus: persistReducer(
    {
      key: 'updateOrderStatus',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    update_order_status_reducer,
  ),
  cancelOrder: persistReducer(
    {
      key: 'cancelOrder',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    cancel_order_reducer,
  ),
  returnReplace: persistReducer(
    {
      key: 'returnReplace',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    return_replace_ord_reducer,
  ),
  refundUpdates: persistReducer(
    {
      key: 'refundUpdates',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    refund_updates_reducer,
  ),
  shipmentUpdates: persistReducer(
    {
      key: 'shipmentUpdates',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    shipment_updates_reducer,
  ),
  returnUpdates: persistReducer(
    {
      key: 'returnUpdates',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    return_updates_reducer,
  ),
  paymentUpdates: persistReducer(
    {
      key: 'paymentUpdates',
      storage: storage,
      blacklist: ['data', 'status'],
    },
    payment_updates_reducer,
  ),
  countries: persistReducer(
    {
      key: 'allCountries',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    all_countries,
  ),
  states: persistReducer(
    {
      key: 'allStates',
      storage: storage,
      blacklist: ['message', 'status', 'states'],
    },
    country_all_states,
  ),
  districts: persistReducer(
    {
      key: 'allDistricts',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    state_all_districts,
  ),
  sendMail: persistReducer(
    {
      key: 'sendMail',
      storage: storage,
      blacklist: ['message', 'status'],
    },
    send_mail_reducer,
  ),
});

export default persistedReducer;
