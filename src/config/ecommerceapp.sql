--------------START----------------
--- DATABASE
CREATE DATABASE `eCOmmerceApp`;

--- USERS
CREATE TABLE `users` (
  `id` varchar(36),
  `firstName` varchar(20) NOT NULL,
  `middleName` varchar(20),
  `lastName` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY(`id`)
);

---PRODUCTS
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `category` varchar(50) NOT NULL,
  `model` varchar(20) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `price` int(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `rating` decimal(3,0) NOT NULL,
  PRIMARY KEY(`id`)
);

--CARTS
CREATE TABLE `carts` (
  `id` varchar(36),
  `userId` varchar(36) NOT NULL,
  `totalBill` int(30) NOT NULL,
  `status` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT Fk_carts FOREIGN KEY(`userId`)  REFERENCES users(`id`)
);

---- Cart_products
CREATE TABLE `cart_products` (
  `id` int(11),
  `cartId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT Fk_cart_products_cartId FOREIGN KEY(`cartId`) REFERENCES carts(`id`),
  CONSTRAINT Fk_cart_products_productId FOREIGN KEY(`productId`) REFERENCES products(`id`)
);

--- ORDERS
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `cartId` varchar(36) NOT NULL,
  `order_status` varchar(30) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT Uc_orders_cartId UNIQUE (`cartId`),
  CONSTRAINT Fk_orders_cartId FOREIGN KEY(`cartId`) REFERENCES carts(`id`),
  CONSTRAINT Fk_orders_userId FOREIGN KEY(`userId`) REFERENCES users(`id`) 
);

--- PAYMENT
CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `orderId` varchar(36) NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT Uc_payment_orderId UNIQUE (`orderId`),
  CONSTRAINT Fk_payment_userId FOREIGN KEY(`userId`) REFERENCES users(`id`),
  CONSTRAINT Fk_payment_orderId FOREIGN KEY(`orderId`) REFERENCES orders(`id`)
);

---SHIPMENT
CREATE TABLE `shipment` (
  `id` int(11) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `orderId` varchar(36) NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT Uc_shipment_orderId UNIQUE (`orderId`),
  CONSTRAINT FK_shipment_userId FOREIGN KEY(`userId`) REFERENCES users(`id`),
  CONSTRAINT FK_shipment_orderId FOREIGN KEY(`orderId`) REFERENCES orders(`id`)
);

--- SHIPMENT ADDRESS
CREATE TABLE `shipment_address` (
  `id` int(11) NOT NULL,
  `userId` VARCHAR(36) NOT NULL,
  `orderId` varchar(36) NOT NULL,
  `country` varchar(30) NOT NULL,
  `province` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `ward` int(11) NOT NULL,
  `tole` varchar(30) NOT NULL,
  `houseNo` int(11) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT Uc_shipment_address_orderId UNIQUE (`orderId`),
  CONSTRAINT Fk_shipment_address_userId FOREIGN KEY (`userId`) REFERENCES users(`id`),
  CONSTRAINT Fk_shipment_address_orderId FOREIGN KEY (`orderId`) REFERENCES orders(`id`)
);

-----------END-----------------