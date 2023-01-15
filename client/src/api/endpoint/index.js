import { apiEndpoint } from 'modules/api';

/*
 * Api endpoints for user
 */
const userEndpoint = apiEndpoint('user');
userEndpoint.get('all');
userEndpoint.get('one');
userEndpoint.get('limited');
userEndpoint.post('login');
userEndpoint.post('register');
userEndpoint.put('update');
userEndpoint.put('updateRole');
userEndpoint.delete('remove');

export const user = userEndpoint.getEndpoints();

/*
 * Api endpoints for product
 */

const productEndpoint = apiEndpoint('product');
productEndpoint.get('all');
productEndpoint.get('limited');
productEndpoint.get('one/:productId');
productEndpoint.post('add');
productEndpoint.delete('remove');
productEndpoint.put('update');
productEndpoint.get('revenueReport');
productEndpoint.get('arAgingReport');
productEndpoint.get('search/:keyword');

export const product = productEndpoint.getEndpoints();

/*
 * Api endpoints for review
 */

const reviewEndpoint = apiEndpoint('review');
reviewEndpoint.get('add');
reviewEndpoint.get('all');
reviewEndpoint.get('limited');
reviewEndpoint.get('one');
reviewEndpoint.get('allByOrderId');
reviewEndpoint.get('limitedByOrderId');
reviewEndpoint.get('allByProductId');
reviewEndpoint.get('limitedByProductId');
reviewEndpoint.get('rating');
reviewEndpoint.delete('remove');

export const review = reviewEndpoint.getEndpoints();

/*
 * Api endpoints for cart
 */

const cartEndpoint = apiEndpoint('cart');
cartEndpoint.get('all');
cartEndpoint.get('limited');
cartEndpoint.get('one');
cartEndpoint.post('addProduct');
cartEndpoint.delete('removeProduct');
cartEndpoint.put('updateQuantity');

export const cart = cartEndpoint.getEndpoints();

/*
 * Api endpoints for order
 */

const orderEndpoint = apiEndpoint('order');
orderEndpoint.get('all');
orderEndpoint.get('limited');
orderEndpoint.get('one');
orderEndpoint.get('userLimited');
orderEndpoint.get('user');
orderEndpoint.post('place');
orderEndpoint.put('updateQuantity');
orderEndpoint.put('updateAddress');
orderEndpoint.put('updatePayment');
orderEndpoint.put('updateStatus');
orderEndpoint.put('updateShipment');
orderEndpoint.get('track');
orderEndpoint.put('cancel');
orderEndpoint.put('returnReplace');
orderEndpoint.get('refundUpdates');
orderEndpoint.get('shipmentUpdates');
orderEndpoint.get('returnUpdates');
orderEndpoint.get('paymentupdates');

export const order = orderEndpoint.getEndpoints();

/*
 * Api endpoints for order
 */

const addressEndpoint = apiEndpoint('address');
addressEndpoint.get('countries');
addressEndpoint.get('states');
addressEndpoint.get('districts');
addressEndpoint.get('countryStates');
addressEndpoint.get('stateDistricts');

export const address = addressEndpoint.getEndpoints();

/*
 * Api endpoints for mail
 */

const mailEndpoint = apiEndpoint('mail');
mailEndpoint.post('send');

export const mail = mailEndpoint.getEndpoints();
