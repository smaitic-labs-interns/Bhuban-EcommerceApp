
---DATABASE
CREATE DATABASE eCOmmerceApp;

-- USERS
CREATE TABLE users (
  id varchar(36),
  firstName varchar(20) NOT NULL,
  middleName varchar(20),
  lastName varchar(20) NOT NULL,
  address varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  imageUrl text,
  imgageAltText text,
  password text NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(id)
);

-- PRODUCTS
CREATE TABLE products (
  id varchar(36) NOT NULL,
  category varchar(50) NOT NULL,
  model varchar(20) NOT NULL,
  brand varchar(20) NOT NULL,
  name text ,
  description text NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
  rating decimal(3,0) DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(id)
);

--Product Images
CREATE TABLE product_images (
  id SERIAL,
  productId varchar(36) NOT NULL,
  imageUrl text NOT NULL,
  altText text,
  PRIMARY KEY(id),
  CONSTRAINT Fk_product_images_productId FOREIGN KEY(productId) REFERENCES products(id)
);

 --CARTS
 CREATE TABLE carts (
  id varchar(36),
  userId varchar(36) NOT NULL,
  totalBill BIGINT NOT NULL,
  status varchar(20) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(id),
  CONSTRAINT Fk_carts FOREIGN KEY(userId)  REFERENCES users(id)
);

--CART_PRODUCTS
CREATE TABLE cart_products (
  id SERIAL,
  cartId varchar(36) NOT NULL,
  productId varchar(36) NOT NULL,
  quantity BIGINT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT Fk_cart_products_cartId FOREIGN KEY(cartId) REFERENCES carts(id),
  CONSTRAINT Fk_cart_products_productId FOREIGN KEY(productId) REFERENCES products(id)
);

--ORDERS
CREATE TABLE orders (
  id varchar(36) NOT NULL,
  userId varchar(36) NOT NULL,
  totalBill BIGINT NOT NULL,
  orderStatus varchar(30) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(id),
  CONSTRAINT Fk_orders_userId FOREIGN KEY(userId) REFERENCES users(id) 
);

-- ORDER PRODUCTS
CREATE TABLE order_products (
  id SERIAL,
  orderId varchar(36) NOT NULL,
  productId varchar(36) NOT NULL,
  quantity BIGINT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT Fk_order_products_cartId FOREIGN KEY(orderId) REFERENCES orders(id),
  CONSTRAINT Fk_order_products_productId FOREIGN KEY(productId) REFERENCES products(id)
);

--- PAYMENT
CREATE TABLE payment (
  id SERIAL,
  userId VARCHAR(36) NOT NULL,
  orderId varchar(36) NOT NULL,
  type varchar(30) NOT NULL,
  status varchar(30) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT Uc_payment_orderId UNIQUE (orderId),
  CONSTRAINT Fk_payment_userId FOREIGN KEY(userId) REFERENCES users(id),
  CONSTRAINT Fk_payment_orderId FOREIGN KEY(orderId) REFERENCES orders(id)
);

--- SHIPMENT
CREATE TABLE shipment (
  id SERIAL,
  userId VARCHAR(36) NOT NULL,
  orderId varchar(36) NOT NULL,
  type varchar(30) NOT NULL,
  status varchar(30) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT Uc_shipment_orderId UNIQUE (orderId),
  CONSTRAINT FK_shipment_userId FOREIGN KEY(userId) REFERENCES users(id),
  CONSTRAINT FK_shipment_orderId FOREIGN KEY(orderId) REFERENCES orders(id)
);

--- SHIPMENT ADDRESS

CREATE TABLE shipment_address (
  id SERIAL,
  userId VARCHAR(36) NOT NULL,
  orderId varchar(36) NOT NULL,
  country varchar(30) NOT NULL,
  province varchar(30) NOT NULL,
  city varchar(30) NOT NULL,
  ward BIGINT NOT NULL,
  tole varchar(30) NOT NULL,
  houseNo BIGINT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT Uc_shipment_address_orderId UNIQUE (orderId),
  CONSTRAINT Fk_shipment_address_userId FOREIGN KEY (userId) REFERENCES users(id),
  CONSTRAINT Fk_shipment_address_orderId FOREIGN KEY (orderId) REFERENCES orders(id)
);