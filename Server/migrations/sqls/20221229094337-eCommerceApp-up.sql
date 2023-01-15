-- Database: eCommerceApp

-- DROP DATABASE IF EXISTS "eCommerceApp";
-- BEGIN;
-- createdb "eCommerceApp"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.utf8'
--     LC_CTYPE = 'en_US.utf8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;
-- COMMIT;


-- Create User Type Enum

BEGIN;

DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'editor', 'user');
    END IF;
END
$$;

COMMIT;

-- Table: public.users
-- DROP TABLE IF EXISTS public.users;
BEGIN;
CREATE TABLE IF NOT EXISTS public.reviews
(
    id integer NOT NULL DEFAULT nextval('reviews_id_seq'::regclass),
    orderid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    productid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    createdby character varying(36) COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT now(),
    review text COLLATE pg_catalog."default",
    rating integer NOT NULL,
    CONSTRAINT reviews_pkey PRIMARY KEY (id),
    CONSTRAINT fk_reviews_orderid FOREIGN KEY (orderid)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_reviews_productid FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_reviews_userid FOREIGN KEY (createdby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
COMMIT;



-- Table: public.products

-- DROP TABLE IF EXISTS public.products;
BEGIN;
CREATE TABLE IF NOT EXISTS public.products
(
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    category character varying(50) COLLATE pg_catalog."default" NOT NULL,
    model character varying(20) COLLATE pg_catalog."default" NOT NULL,
    brand character varying(20) COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL,
    addedby character varying(36) COLLATE pg_catalog."default" NOT NULL,
    addedat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    updatedby character varying(36) COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;
COMMIT;

-- Table: public.product_images

-- DROP TABLE IF EXISTS public.product_images;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'product_images_id_seq') THEN
        CREATE SEQUENCE product_images_id_seq;
    END IF;
END
$$;


CREATE TABLE IF NOT EXISTS public.product_images
(
    id integer NOT NULL DEFAULT nextval('product_images_id_seq'::regclass),
    productid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    imageurl text COLLATE pg_catalog."default" NOT NULL,
    alttext text COLLATE pg_catalog."default",
    CONSTRAINT product_images_pkey PRIMARY KEY (id),
    CONSTRAINT fk_product_images_productid FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product_images
    OWNER to postgres;
COMMIT;

-- Table: public.carts

-- DROP TABLE IF EXISTS public.carts;
BEGIN;
CREATE TABLE IF NOT EXISTS public.carts
(
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    userid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    totalbill bigint NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone DEFAULT now(),
    updatedby character varying(36) COLLATE pg_catalog."default",
    CONSTRAINT carts_pkey PRIMARY KEY (id),
    CONSTRAINT fk_carts FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.carts
    OWNER to postgres;
COMMIT;

-- Table: public.cart_products

-- DROP TABLE IF EXISTS public.cart_products;
BEGIN;

DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'cart_products_id_seq') THEN
        CREATE SEQUENCE cart_products_id_seq;
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.cart_products
(
    id integer NOT NULL DEFAULT nextval('cart_products_id_seq'::regclass),
    cartid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    productid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    quantity bigint NOT NULL,
    CONSTRAINT cart_products_pkey PRIMARY KEY (id),
    CONSTRAINT fk_cart_products_cartid FOREIGN KEY (cartid)
        REFERENCES public.carts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_cart_products_productid FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cart_products
    OWNER to postgres;
COMMIT;

-- Table: public.orders

-- DROP TABLE IF EXISTS public.orders;
BEGIN;
CREATE TABLE IF NOT EXISTS public.orders
(
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    userid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    totalbill bigint NOT NULL,
    orderstatus character varying(30) COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT now(),
    updatedat timestamp without time zone,
    updatedby character varying(36) COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT fk_orders_userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orders
    OWNER to postgres;
COMMIT;


-- Table: public.order_products

-- DROP TABLE IF EXISTS public.order_products;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'order_products_id_seq') THEN
        CREATE SEQUENCE order_products_id_seq;
    END IF;
END
$$;


CREATE TABLE IF NOT EXISTS public.order_products
(
    id integer NOT NULL DEFAULT nextval('order_products_id_seq'::regclass),
    orderid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    productid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    quantity bigint NOT NULL,
    CONSTRAINT order_products_pkey PRIMARY KEY (id),
    CONSTRAINT fk_order_products_cartid FOREIGN KEY (orderid)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_order_products_productid FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.order_products
    OWNER to postgres;
COMMIT;

-- Table: public.payment

-- DROP TABLE IF EXISTS public.payment;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'payment_id_seq') THEN
        CREATE SEQUENCE payment_id_seq;
    END IF;
END
$$;


CREATE TABLE IF NOT EXISTS public.payment
(
    id integer NOT NULL DEFAULT nextval('payment_id_seq'::regclass),
    userid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    orderid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    type character varying(30) COLLATE pg_catalog."default" NOT NULL,
    status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT payment_pkey PRIMARY KEY (id),
    CONSTRAINT uc_payment_orderid UNIQUE (orderid),
    CONSTRAINT fk_payment_orderid FOREIGN KEY (orderid)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_payment_userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.payment
    OWNER to postgres;
COMMIT;


-- Table: public.shipment

-- DROP TABLE IF EXISTS public.shipment;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'shipment_id_seq') THEN
        CREATE SEQUENCE shipment_id_seq;
    END IF;
END
$$;


CREATE TABLE IF NOT EXISTS public.shipment
(
    id integer NOT NULL DEFAULT nextval('shipment_id_seq'::regclass),
    userid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    orderid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    type character varying(30) COLLATE pg_catalog."default" NOT NULL,
    status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT shipment_pkey PRIMARY KEY (id),
    CONSTRAINT uc_shipment_orderid UNIQUE (orderid),
    CONSTRAINT fk_shipment_orderid FOREIGN KEY (orderid)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_shipment_userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.shipment
    OWNER to postgres;
COMMIT;

-- Table: public.shipment_address

-- DROP TABLE IF EXISTS public.shipment_address;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'shipment_address_id_seq') THEN
        CREATE SEQUENCE shipment_address_id_seq;
    END IF;
END
$$;


CREATE TABLE IF NOT EXISTS public.shipment_address
(
    id integer NOT NULL DEFAULT nextval('shipment_address_id_seq'::regclass),
    userid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    orderid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    country character varying(30) COLLATE pg_catalog."default" NOT NULL,
    province character varying(30) COLLATE pg_catalog."default" NOT NULL,
    city character varying(30) COLLATE pg_catalog."default" NOT NULL,
    ward bigint NOT NULL,
    tole character varying(30) COLLATE pg_catalog."default" NOT NULL,
    houseno bigint NOT NULL,
    CONSTRAINT shipment_address_pkey PRIMARY KEY (id),
    CONSTRAINT uc_shipment_address_orderid UNIQUE (orderid),
    CONSTRAINT fk_shipment_address_orderid FOREIGN KEY (orderid)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_shipment_address_userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.shipment_address
    OWNER to postgres;
COMMIT;

-- Table: public.countries

-- DROP TABLE IF EXISTS public.countries;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'countries_id_seq') THEN
        CREATE SEQUENCE countries_id_seq;
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.countries
(
    id integer NOT NULL DEFAULT nextval('countries_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    capital character varying(100) COLLATE pg_catalog."default" NOT NULL,
    cc_iso2 character varying(2) COLLATE pg_catalog."default" NOT NULL,
    cc_iso3 character varying(3) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT countries_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.countries
    OWNER to postgres;

COMMIT;

-- Table: public.states

-- DROP TABLE IF EXISTS public.states;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'states_id_seq') THEN
        CREATE SEQUENCE states_id_seq;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'states_countryid_seq') THEN
        CREATE SEQUENCE states_countryid_seq;
    END IF;
END
$$;


CREATE TABLE IF NOT EXISTS public.states
(
    id integer NOT NULL DEFAULT nextval('states_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    countryid integer NOT NULL DEFAULT nextval('states_countryid_seq'::regclass),
    CONSTRAINT states_pkey PRIMARY KEY (id),
    CONSTRAINT fk_states_countryid FOREIGN KEY (countryid)
        REFERENCES public.countries (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.states
    OWNER to postgres;
COMMIT;

-- Table: public.districts

-- DROP TABLE IF EXISTS public.districts;

BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'districts_id_seq') THEN
        CREATE SEQUENCE districts_id_seq;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'districts_stateid_seq') THEN
        CREATE SEQUENCE districts_stateid_seq;
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.districts (
  id integer NOT NULL DEFAULT nextval('districts_id_seq'::regclass),
  name character varying(100) COLLATE pg_catalog."default" NOT NULL,
  stateid integer NOT NULL DEFAULT nextval('districts_stateid_seq'::regclass),
  CONSTRAINT districts_pkey PRIMARY KEY (id),
  CONSTRAINT fk_districts_stateid FOREIGN KEY (stateid)
    REFERENCES public.states (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.districts
  OWNER to postgres;
COMMIT;


-- Table: public.reviews

-- DROP TABLE IF EXISTS public.reviews;
BEGIN;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'reviews_id_seq') THEN
        CREATE SEQUENCE reviews_id_seq;
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.reviews
(
    id integer NOT NULL DEFAULT nextval('reviews_id_seq'::regclass),
    productid character varying(36) COLLATE pg_catalog."default" NOT NULL,
    createdby character varying(36) COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone DEFAULT now(),
    review text COLLATE pg_catalog."default",
    rating integer NOT NULL,
    CONSTRAINT reviews_pkey PRIMARY KEY (id),
    CONSTRAINT fk_reviews_productid FOREIGN KEY (productid)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_reviews_userid FOREIGN KEY (createdby)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reviews
    OWNER to postgres;
COMMIT;

-- Insert Into Countries

BEGIN;
INSERT INTO public.countries(id, name, capital, cc_iso2, cc_iso3)
	VALUES 
    (1, 'Afghanistan', 'Kabul', 'AF', 'AFG'),
    (2, 'Albania', 'Tirana', 'AL', 'ALB'),
    (3, 'Algeria', 'Algiers', 'DZ', 'DZA'),
    (4, 'American Samoa', 'Pago Pago', 'AS', 'ASM'),
    (5, 'Andorra', 'Andorra la Vella', 'AD', 'AND'),
    (6, 'Angola', 'Luanda', 'AO', 'AGO'),
    (7, 'Anguilla', 'The Valley', 'AI', 'AIA'),
    (8, 'Antigua And Barbuda', 'Saint John''s', 'AG', 'ATG'),
    (9, 'Argentina', 'Buenos Aires', 'AR', 'ARG'),
    (10, 'Armenia', 'Yerevan', 'AM', 'ARM'),
    (11, 'Aruba', 'Oranjestad', 'AW', 'ABW'),
    (12, 'Australia', 'Sydney', 'AU', 'AUS'),
    (13, 'Austria', 'Vienna', 'AT', 'AUT'),
    (14, 'Azerbaijan', 'Baku', 'AZ', 'AZE'),
    (15, 'Bahrain', 'Manama', 'BH', 'BHR'),
    (16, 'Bangladesh', 'Dhaka', 'BD', 'BGD'),
    (17, 'Barbados', 'Bridgetown', 'BB', 'BRB'),
    (18, 'Belarus', 'Minsk', 'BY', 'BLR'),
    (19, 'Belgium', 'Brussels', 'BE', 'BEL'),
    (20, 'Belize', 'Belmopan', 'BZ', 'BLZ'),
    (21, 'Benin', 'Cotonou', 'BJ', 'BEN'),
    (22, 'Bermuda', 'Hamilton', 'BM', 'BMU'),
    (23, 'Bhutan', 'Thimphu', 'BT', 'BTN'),
    (24, 'Bolivia', 'Santa Cruz', 'BO', 'BOL'),
    (25, 'Bosnia And Herzegovina', 'Sarajevo', 'BA', 'BIH'),
    (26, 'Botswana', 'Gaborone', 'BW', 'BWA'),
    (27, 'Brazil', 'Sao Paulo', 'BR', 'BRA'),
    (28, 'British Virgin Islands', 'Road Town', 'VG', 'VGB'),
    (29, 'Brunei', 'Bandar Seri Begawan', 'BN', 'BRN'),
    (30, 'Bulgaria', 'Sofia', 'BG', 'BGR'),
    (31, 'Burkina Faso', 'Ouagadougou', 'BF', 'BFA'),
    (32, 'Burundi', 'Bujumbura', 'BI', 'BDI'),
    (33, 'Cabo Verde', 'Praia', 'CV', 'CPV'),
    (34, 'Cambodia', 'Phnom Penh', 'KH', 'KHM'),
    (35, 'Cameroon', 'Yaounde', 'CM', 'CMR'),
    (36, 'Canada', 'Toronto', 'CA', 'CAN'),
    (37, 'Cayman Islands', 'George Town', 'KY', 'CYM'),
    (38, 'Central African Republic', 'Bangui', 'CF', 'CAF'),
    (39, 'Chad', 'N''Djamena', 'TD', 'TCD'),
    (40, 'Chile', 'Santiago', 'CL', 'CHL'),
    (41, 'China', 'Shanghai', 'CN', 'CHN'),
    (42, 'Christmas Island', 'Flying Fish Cove', 'CX', 'CXR'),
    (43, 'Colombia', 'Bogota', 'CO', 'COL'),
    (44, 'Comoros', 'Moroni', 'KM', 'COM'),
    (45, 'Congo (Brazzaville)', 'Brazzaville', 'CG', 'COG'),
    (46, 'Congo (Kinshasa)', 'Kinshasa', 'CD', 'COD'),
    (47, 'Cook Islands', 'Avarua', 'CK', 'COK'),
    (48, 'Costa Rica', 'San Jose', 'CR', 'CRI'),
    (49, 'Croatia', 'Zagreb', 'HR', 'HRV'),
    (50, 'Cuba', 'Havana', 'CU', 'CUB'),
    (51, 'Curaçao', 'Willemstad', 'CW', 'CUW'),
    (52, 'Cyprus', 'Nicosia', 'CY', 'CYP'),
    (53, 'Czechia', 'Prague', 'CZ', 'CZE'),
    (54, 'Côte d''Ivoire', 'Abidjan', 'CI', 'CIV'),
    (55, 'Denmark', 'Copenhagen', 'DK', 'DNK'),
    (56, 'Djibouti', 'Djibouti', 'DJ', 'DJI'),
    (57, 'Dominica', 'Roseau', 'DM', 'DMA'),
    (58, 'Dominican Republic', 'Santo Domingo', 'DO', 'DOM'),
    (59, 'Ecuador', 'Guayaquil', 'EC', 'ECU'),
    (60, 'Egypt', 'Cairo', 'EG', 'EGY'),
    (61, 'El Salvador', 'San Salvador', 'SV', 'SLV'),
    (62, 'Equatorial Guinea', 'Malabo', 'GQ', 'GNQ'),
    (63, 'Eritrea', 'Asmara', 'ER', 'ERI'),
    (64, 'Estonia', 'Tallinn', 'EE', 'EST'),
    (65, 'Ethiopia', 'Addis Ababa', 'ET', 'ETH'),
    (66, 'Falkland Islands (Islas Malvinas)', 'Stanley', 'FK', 'FLK'),
    (67, 'Faroe Islands', 'Torshavn', 'FO', 'FRO'),
    (68, 'Federated States of Micronesia', 'Palikir', 'FM', 'FSM'),
    (69, 'Fiji', 'Suva', 'FJ', 'FJI'),
    (70, 'Finland', 'Helsinki', 'FI', 'FIN'),
    (71, 'France', 'Paris', 'FR', 'FRA'),
    (72, 'French Guiana', 'Cayenne', 'GF', 'GUF'),
    (73, 'French Polynesia', 'Papeete', 'PF', 'PYF'),
    (74, 'Gabon', 'Libreville', 'GA', 'GAB'),
    (75, 'Gaza Strip', 'Gaza', 'XG', 'XGZ'),
    (76, 'Georgia', 'Tbilisi', 'GE', 'GEO'),
    (77, 'Germany', 'Berlin', 'DE', 'DEU'),
    (78, 'Ghana', 'Accra', 'GH', 'GHA'),
    (79, 'Gibraltar', 'Gibraltar', 'GI', 'GIB'),
    (80, 'Greece', 'Athens', 'GR', 'GRC'),
    (81, 'Greenland', 'Nuuk', 'GL', 'GRL'),
    (82, 'Grenada', 'Saint George''s', 'GD', 'GRD'),
    (83, 'Guadeloupe', 'Basse-Terre', 'GP', 'GLP'),
    (84, 'Guam', 'Hagta', 'GU', 'GUM'),
    (85, 'Guatemala', 'Guatemala City', 'GT', 'GTM'),
    (86, 'Guinea', 'Conakry', 'GN', 'GIN'),
    (87, 'Guinea-Bissau', 'Bissau', 'GW', 'GNB'),
    (88, 'Guyana', 'Georgetown', 'GY', 'GUY'),
    (89, 'Haiti', 'Port-au-Prince', 'HT', 'HTI'),
    (90, 'Honduras', 'Comayaguela', 'HN', 'HND'),
    (91, 'Hong Kong', 'Hong Kong', 'HK', 'HKG'),
    (92, 'Hungary', 'Budapest', 'HU', 'HUN'),
    (93, 'Iceland', 'Reykjavik', 'IS', 'ISL'),
    (94, 'India', 'Delhi', 'IN', 'IND'),
    (95, 'Indonesia', 'Jakarta', 'ID', 'IDN'),
    (96, 'Iran', 'Tehran', 'IR', 'IRN'),
    (97, 'Iraq', 'Baghdad', 'IQ', 'IRQ'),
    (98, 'Ireland', 'Dublin', 'IE', 'IRL'),
    (99, 'Isle Of Man', 'Douglas', 'IM', 'IMN'),
    (100, 'Israel', 'Jerusalem', 'IL', 'ISR'),
    (101, 'Italy', 'Rome', 'IT', 'ITA'),
    (102, 'Jamaica', 'Kingston', 'JM', 'JAM'),
    (103, 'Japan', 'Tokyo', 'JP', 'JPN'),
    (104, 'Jersey', 'Saint Helier', 'JE', 'JEY'),
    (105, 'Jordan', 'Amman', 'JO', 'JOR'),
    (106, 'Kazakhstan', 'Almaty', 'KZ', 'KAZ'),
    (107, 'Kenya', 'Nairobi', 'KE', 'KEN'),
    (108, 'Kiribati', 'Tarawa', 'KI', 'KIR'),
    (109, 'Kosovo', 'Pristina', 'XK', 'XKS'),
    (110, 'Kuwait', 'Kuwait City', 'KW', 'KWT'),
    (111, 'Kyrgyzstan', 'Bishkek', 'KG', 'KGZ'),
    (112, 'Laos', 'Vientiane', 'LA', 'LAO'),
    (113, 'Latvia', 'Riga', 'LV', 'LVA'),
    (114, 'Lebanon', 'Beirut', 'LB', 'LBN'),
    (115, 'Lesotho', 'Maseru', 'LS', 'LSO'),
    (116, 'Liberia', 'Monrovia', 'LR', 'LBR'),
    (117, 'Libya', 'Tripoli', 'LY', 'LBY'),
    (118, 'Liechtenstein', 'Vaduz', 'LI', 'LIE'),
    (119, 'Lithuania', 'Vilnius', 'LT', 'LTU'),
    (120, 'Luxembourg', 'Luxembourg', 'LU', 'LUX'),
    (121, 'Macau', 'Macau', 'MO', 'MAC'),
    (122, 'Macedonia', 'Skopje', 'MK', 'MKD'),
    (123, 'Madagascar', 'Antananarivo', 'MG', 'MDG'),
    (124, 'Malawi', 'Blantyre', 'MW', 'MWI'),
    (125, 'Malaysia', 'Kuala Lumpur', 'MY', 'MYS'),
    (126, 'Maldives', 'Male', 'MV', 'MDV'),
    (127, 'Mali', 'Bamako', 'ML', 'MLI'),
    (128, 'Malta', 'Valletta', 'MT', 'MLT'),
    (129, 'Marshall Islands', 'Majuro', 'MH', 'MHL'),
    (130, 'Martinique', 'Fort-de-France', 'MQ', 'MTQ'),
    (131, 'Mauritania', 'Nouakchott', 'MR', 'MRT'),
    (132, 'Mauritius', 'Port Louis', 'MU', 'MUS'),
    (133, 'Mayotte', 'Mamoudzou', 'YT', 'MYT'),
    (134, 'Mexico', 'Mexico City', 'MX', 'MEX'),
    (135, 'Moldova', 'Chisinau', 'MD', 'MDA'),
    (136, 'Monaco', 'Monaco', 'MC', 'MCO'),
    (137, 'Mongolia', 'Ulaanbaatar', 'MN', 'MNG'),
    (138, 'Montenegro', 'Podgorica', 'ME', 'MNE'),
    (139, 'Montserrat', 'Brades', 'MS', 'MSR'),
    (140, 'Morocco', 'Casablanca', 'MA', 'MAR'),
    (141, 'Mozambique', 'Maputo', 'MZ', 'MOZ'),
    (142, 'Myanmar', 'Rangoon', 'MM', 'MMR'),
    (143, 'Namibia', 'Windhoek', 'NA', 'NAM'),
    (144, 'Nauru', 'Yaren', 'NR', 'NRU'),
    (145, 'Nepal', 'Kathmandu', 'NP', 'NPL'),
    (146, 'Netherlands', 'Amsterdam', 'NL', 'NLD'),
    (147, 'New Caledonia', 'Noumea', 'NC', 'NCL'),
    (148, 'New Zealand', 'Auckland', 'NZ', 'NZL'),
    (149, 'Nicaragua', 'Managua', 'NI', 'NIC'),
    (150, 'Niger', 'Niamey', 'NE', 'NER'),
    (151, 'Nigeria', 'Lagos', 'NG', 'NGA'),
    (152, 'Niue', 'Alofi', 'NU', 'NIU'),
    (153, 'Norfolk Island', 'Kingston', 'NF', 'NFK'),
    (154, 'North Korea', 'Pyongyang', 'KP', 'PRK'),
    (155, 'Northern Mariana Islands', 'Capitol Hill', 'MP', 'MNP'),
    (156, 'Norway', 'Oslo', 'NO', 'NOR'),
    (157, 'Oman', 'Muscat', 'OM', 'OMN'),
    (158, 'Pakistan', 'Karachi', 'PK', 'PAK'),
    (159, 'Palau', 'Ngerulmud', 'PW', 'PLW'),
    (160, 'Panama', 'Panama City', 'PA', 'PAN'),
    (161, 'Papua New Guinea', 'Port Moresby', 'PG', 'PNG'),
    (162, 'Paraguay', 'Asuncion', 'PY', 'PRY'),
    (163, 'Peru', 'Lima', 'PE', 'PER'),
    (164, 'Philippines', 'Manila', 'PH', 'PHL'),
    (165, 'Pitcairn Islands', 'Adamstown', 'PN', 'PCN'),
    (166, 'Poland', 'Warsaw', 'PL', 'POL'),
    (167, 'Portugal', 'Lisbon', 'PT', 'PRT'),
    (168, 'Puerto Rico', 'San Juan', 'PR', 'PRI'),
    (169, 'Qatar', 'Doha', 'QA', 'QAT'),
    (170, 'Reunion', 'Saint-Denis', 'RE', 'REU'),
    (171, 'Romania', 'Bucharest', 'RO', 'ROU'),
    (172, 'Russia', 'Moscow', 'RU', 'RUS'),
    (173, 'Rwanda', 'Kigali', 'RW', 'RWA'),
    (174, 'Saint Barthelemy', 'Gustavia', 'BL', 'BLM'),
    (175, 'Saint Helena, Ascension, And Tristan Da Cunha', 'Jamestown', 'SH', 'SHN'),
    (176, 'Saint Kitts And Nevis', 'Basseterre', 'KN', 'KNA'),
    (177, 'Saint Lucia', 'Castries', 'LC', 'LCA'),
    (178, 'Saint Martin', 'Marigot', 'MF', 'MAF'),
    (179, 'Saint Pierre And Miquelon', 'Saint-Pierre', 'PM', 'SPM'),
    (180, 'Saint Vincent And The Grenadines', 'Kingstown', 'VC', 'VCT'),
    (181, 'Samoa', 'Apia', 'WS', 'WSM'),
    (182, 'San Marino', 'San Marino', 'SM', 'SMR'),
    (183, 'Sao Tome And Principe', 'Sao Tome', 'ST', 'STP'),
    (184, 'Saudi Arabia', 'Riyadh', 'SA', 'SAU'),
    (185, 'Senegal', 'Pikine', 'SN', 'SEN'),
    (186, 'Serbia', 'Belgrade', 'RS', 'SRB'),
    (187, 'Seychelles', 'Victoria', 'SC', 'SYC'),
    (188, 'Sierra Leone', 'Freetown', 'SL', 'SLE'),
    (189, 'Singapore', 'Singapore', 'SG', 'SGP'),
    (190, 'Sint Maarten', 'Philipsburg', 'SX', 'SXM'),
    (191, 'Slovakia', 'Bratislava', 'SK', 'SVK'),
    (192, 'Slovenia', 'Ljubljana', 'SI', 'SVN'),
    (193, 'Solomon Islands', 'Honiara', 'SB', 'SLB'),
    (194, 'Somalia', 'Mogadishu', 'SO', 'SOM'),
    (195, 'South Africa', 'Johannesburg', 'ZA', 'ZAF'),
    (196, 'South Georgia And South Sandwich Islands', 'King Edward Point', 'GS', 'SGS'),
    (197, 'South Korea', 'Seoul', 'KR', 'KOR'),
    (198, 'South Sudan', 'Juba', 'SS', 'SSD'),
    (199, 'Spain', 'Madrid', 'ES', 'ESP'),
    (200, 'Sri Lanka', 'Colombo', 'LK', 'LKA'),
    (201, 'Sudan', 'Khartoum', 'SD', 'SDN'),
    (202, 'Suriname', 'Paramaribo', 'SR', 'SUR'),
    (203, 'Svalbard', 'Longyearbyen', 'XR', 'XSV'),
    (204, 'Swaziland', 'Mbabane', 'SZ', 'SWZ'),
    (205, 'Sweden', 'Stockholm', 'SE', 'SWE'),
    (206, 'Switzerland', 'Bern', 'CH', 'CHE'),
    (207, 'Syria', 'Aleppo', 'SY', 'SYR'),
    (208, 'Taiwan', 'Taichung', 'TW', 'TWN'),
    (209, 'Tajikistan', 'Dushanbe', 'TJ', 'TJK'),
    (210, 'Tanzania', 'Dar es Salaam', 'TZ', 'TZA'),
    (211, 'Thailand', 'Bangkok', 'TH', 'THA'),
    (212, 'The Bahamas', 'Nassau', 'BS', 'BHS'),
    (213, 'The Gambia', 'Banjul', 'GM', 'GMB'),
    (214, 'Timor-Leste', 'Dili', 'TL', 'TLS'),
    (215, 'Togo', 'Lome', 'TG', 'TGO'),
    (216, 'Tonga', 'Nuku`alofa', 'TO', 'TON'),
    (217, 'Trinidad And Tobago', 'Port of Spain', 'TT', 'TTO'),
    (218, 'Tunisia', 'Tunis', 'TN', 'TUN'),
    (219, 'Turkey', 'Istanbul', 'TR', 'TUR'),
    (220, 'Turkmenistan', 'Ashgabat', 'TM', 'TKM'),
    (221, 'Turks And Caicos Islands', 'Grand Turk', 'TC', 'TCA'),
    (222, 'Tuvalu', 'Funafuti', 'TV', 'TUV'),
    (223, 'U.S. Virgin Islands', 'Charlotte Amalie', 'VI', 'VIR'),
    (224, 'Uganda', 'Kampala', 'UG', 'UGA'),
    (225, 'Ukraine', 'Kyiv', 'UA', 'UKR'),
    (226, 'United Arab Emirates', 'Dubai', 'AE', 'ARE'),
    (227, 'United Kingdom', 'London', 'GB', 'GBR'),
    (228, 'United States', 'New York', 'US', 'USA'),
    (229, 'Uruguay', 'Montevideo', 'UY', 'URY'),
    (230, 'Uzbekistan', 'Tashkent', 'UZ', 'UZB'),
    (231, 'Vanuatu', 'Port-Vila', 'VU', 'VUT'),
    (232, 'Vatican City', 'Vatican City', 'VA', 'VAT'),
    (233, 'Venezuela', 'Caracas', 'VE', 'VEN'),
    (234, 'Vietnam', 'Ho Chi Minh City', 'VN', 'VNM'),
    (235, 'Wallis And Futuna', 'Mata-Utu', 'WF', 'WLF'),
    (236, 'West Bank', 'Al Quds', 'XW', 'XWB'),
    (237, 'Yemen', 'Sanaa', 'YE', 'YEM'),
    (238, 'Zambia', 'Lusaka', 'ZM', 'ZMB'),
    (239, 'Zimbabwe', 'Harare', 'ZW', 'ZWE');

COMMIT;

-- INSERT COUNTRY STATES
BEGIN;
INSERT INTO public.states(
	id, name, countryid)
	VALUES 
    (1, 'Province No 1' , 145),
    (2, 'Madhesh Pradesh' , 145),
    (3, 'Bagmati Pradesh' , 145),
    (4, 'Gandaki Pradesh' , 145),
    (5, 'Lumbini Pradesh' , 145),
    (6, 'Karnali Pradesh' , 145),
    (7, 'Sudur Pashchim Pradesh' , 145);
COMMIT;

-- INSERT DISTRICTS
BEGIN;
INSERT INTO public.districts(id, name, stateid)
	VALUES 
    (1, 'Bhojpur' , 1),
    (2, 'Dhankuta' , 1),
    (3, 'Ilam' , 1),
    (4, 'Jhapa' , 1),
    (5, 'Khotang' , 1),
    (6, 'Morang' , 1),
    (7, 'Okhaldhunga' , 1),
    (8, 'Panchthar' , 1),
    (9, 'Sankhuwasabha' , 1),
    (10, 'Solukhumbu' , 1),
    (11, 'Sunsari' , 1),
    (12, 'Taplejung' , 1),
    (13, 'Terhathum' , 1),
    (14, 'Udayapur' , 1),
    (15, 'Parsa' , 2),
    (16, 'Bara' , 2),
    (17, 'Rautahat' , 2),
    (18, 'Sarlahi' , 2),
    (19, 'Dhanusha' , 2),
    (20, 'Siraha' , 2),
    (21, 'Mahottari' , 2),
    (22, 'Saptari' , 2),
    (23, 'Sindhuli' , 3),
    (24, 'Ramechhap' , 3),
    (25, 'Dolakha' , 3),
    (26, 'Bhaktapur' , 3),
    (27, 'Dhading' , 3),
    (28, 'Kathmandu' , 3),
    (29, 'Kavrepalanchok' , 3),
    (30, 'Lalitpur' , 3),
    (31, 'Nuwakot' , 3),
    (32, 'Rasuwa' , 3),
    (33, 'Sindhupalchok' , 3),
    (34, 'Chitwan' , 3),
    (35, 'Makawanpur' , 3),
    (36, 'Baglung' , 4),
    (37, 'Gorkha' , 4),
    (38, 'Kaski' , 4),
    (39, 'Lamjung' , 4),
    (40, 'Manang' , 4),
    (41, 'Mustang' , 4),
    (42, 'Myagdi' , 4),
    (43, 'Nawalpur' , 4),
    (44, 'Parbat' , 4),
    (45, 'Syangja' , 4),
    (46, 'Tanahu' , 4),
    (47, 'Kapilvastu' , 5),
    (48, 'Parasi' , 5),
    (49, 'Rupandehi' , 5),
    (50, 'Arghakhanchi' , 5),
    (51, 'Gulmi' , 5),
    (52, 'Palpa' , 5),
    (53, 'Dang' , 5),
    (54, 'Pyuthan' , 5),
    (55, 'Rolpa' , 5),
    (56, 'Eastern Rukum' , 5),
    (57, 'Banke' , 5),
    (58, 'Bardiya' , 5),
    (59, 'Western Rukum' , 6),
    (60, 'Salyan' , 6),
    (61, 'Dolpa' , 6),
    (62, 'Humla' , 6),
    (63, 'Jumla' , 6),
    (64, 'Kalikot' , 6),
    (65, 'Mugu' , 6),
    (66, 'Surkhet' , 6),
    (67, 'Dailekh' , 6),
    (68, 'Jajarkot' , 6),
    (69, 'Kailali' , 7),
    (70, 'Achham' , 7),
    (71, 'Doti' , 7),
    (72, 'Bajhang' , 7),
    (73, 'Bajura' , 7),
    (74, 'Kanchanpur' , 7),
    (75, 'Dadeldhura' , 7),
    (76, 'Baitadi' , 7),
    (77, 'Darchula' , 7);

COMMIT;
