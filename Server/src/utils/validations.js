const Joi = require("joi");

const user_validation = ({
  firstName,
  middleName,
  lastName,
  address,
  email,
  password,
}) => {
  const user_rule = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    middleName: Joi.string().allow("", null).min(3).max(30),
    lastName: Joi.string().min(3).max(30).required(),
    address: Joi.string().max(100).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });

  return user_rule.validate({
    firstName,
    middleName,
    lastName,
    address,
    email,
    password,
  });
};

const update_user_validation = ({
  firstName,
  middleName,
  lastName,
  address,
}) => {
  const user_rule = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    middleName: Joi.string().allow("", null).min(3).max(30),
    lastName: Joi.string().min(3).max(30).required(),
    address: Joi.string().max(100).required(),
  });

  return user_rule.validate({
    firstName,
    middleName,
    lastName,
    address,
  });
};

const sign_in_validation = ({ email, password }) => {
  const credintals_rule = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return credintals_rule.validate({ email, password });
};

const product_validation = ({
  category,
  model,
  brand,
  name,
  description,
  price,
  quantity,
  addedBy,
}) => {
  const product_rule = Joi.object({
    category: Joi.string().required(),
    model: Joi.required(),
    brand: Joi.string().required(),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().precision(2).min(0.1).required(),
    quantity: Joi.number().min(1).required(),
    addedBy: Joi.string().required(),
  });
  return product_rule.validate({
    category,
    model,
    brand,
    name,
    description,
    price,
    quantity,
    addedBy,
  });
};

const updating_product_validation = ({
  category,
  model,
  brand,
  name,
  description,
  price,
  quantity,
  updatedBy,
}) => {
  const update_product_rule = Joi.object({
    category: Joi.string().allow("", null),
    model: Joi.string().allow("", null),
    brand: Joi.string().allow("", null),
    name: Joi.string(),
    description: Joi.string().allow("", null),
    price: Joi.number().allow("", null),
    quantity: Joi.number().allow(0, "", null),
    updatedBy: Joi.string().required(),
  });
  return update_product_rule.validate({
    category,
    model,
    brand,
    name,
    description,
    price,
    quantity,
    updatedBy,
  });
};

const address_validation = ({
  country,
  province,
  city,
  ward,
  tole,
  houseNo,
}) => {
  const address_schema = Joi.object({
    country: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    ward: Joi.number().required(),
    tole: Joi.string().required(),
    houseNo: Joi.number().required(),
  });
  return address_schema.validate({
    country,
    province,
    city,
    ward,
    tole,
    houseNo,
  });
};

const Updatable_address_validation = ({
  country,
  province,
  city,
  ward,
  tole,
  houseNo,
}) => {
  const updatable_address_schema = Joi.object({
    country: Joi.string().allow("", null),
    province: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    ward: Joi.number().allow("", null),
    tole: Joi.string().allow("", null),
    houseNo: Joi.number().allow("", null),
  });
  return updatable_address_schema.validate({
    country,
    province,
    city,
    ward,
    tole,
    houseNo,
  });
};

module.exports = {
  user_validation,
  update_user_validation,
  sign_in_validation,
  product_validation,
  updating_product_validation,
  address_validation,
  Updatable_address_validation,
};

const send_email_validation = ({ to, from, subject }) => {
  const send_email_schema = Joi.object({
    to: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    from: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    subject: Joi.string().required(),
  });
  return send_email_schema.validate({
    to,
    from,
    subject,
  });
};

module.exports = {
  user_validation,
  update_user_validation,
  sign_in_validation,
  product_validation,
  updating_product_validation,
  address_validation,
  Updatable_address_validation,
  send_email_validation,
};
