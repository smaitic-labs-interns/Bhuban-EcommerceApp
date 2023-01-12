import { registerRules } from './userRules/register.rules';
import { loginRules } from './userRules/login.rules';
import { updateUserRules } from './userRules/updateUser.rules';
import { addProductRules } from './adminRules/addProduct';
import { shippingRules } from './userRules/shipping.rules';
import { updateAddressRule } from './adminRules/updateAddress';

export {
  registerRules,
  loginRules,
  addProductRules,
  shippingRules,
  updateUserRules,
  updateAddressRule,
};
