-- phpMyAdmin SQL Dump
-- version 4.9.2
-- SQLINES DEMO *** admin.net/
--
-- SQLINES DEMO *** 306
-- SQLINES DEMO *** Dec 25, 2021 at 06:48 AM
-- SQLINES DEMO *** 0.4.10-MariaDB
-- PHP Version: 7.3.12




/* SQLINES DEMO *** ARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** ARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** LLATION_CONNECTION=@@COLLATION_CONNECTION */;
/* SQLINES DEMO *** tf8mb4 */;

--
-- SQLINES DEMO *** -store-main
--

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table banking_upi
--

DROP TABLE IF EXISTS banking_upi;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE banking_upi_seq;

CREATE TABLE IF NOT EXISTS banking_upi (
  id int CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('banking_upi_seq'),
  store_id int CHECK (store_id > 0) NOT NULL,
  upi_id varchar(64) NOT NULL,
  user_id varchar(8) NOT NULL,
  PRIMARY KEY (id)
  CREATE INDEX store_id ON banking_upi (store_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table brand
--

DROP TABLE IF EXISTS brand;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE brand_seq;

CREATE TABLE IF NOT EXISTS brand (
  brand_id int CHECK (brand_id > 0) NOT NULL DEFAULT NEXTVAL ('brand_seq'),
  brand varchar(64) NOT NULL,
  PRIMARY KEY (brand_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table category
--

DROP TABLE IF EXISTS category;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE category_seq;

CREATE TABLE IF NOT EXISTS category (
  category_id int CHECK (category_id > 0) NOT NULL DEFAULT NEXTVAL ('category_seq'),
  category varchar(64) NOT NULL,
  PRIMARY KEY (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table inventory
--

DROP TABLE IF EXISTS inventory;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE inventory_seq;

CREATE TABLE IF NOT EXISTS inventory (
  id int CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('inventory_seq'),
  product_id int CHECK (product_id > 0) NOT NULL,
  store_id int CHECK (store_id > 0) NOT NULL,
  selling_price int CHECK (selling_price > 0) NOT NULL,
  stock int CHECK (stock > 0) NOT NULL,
  PRIMARY KEY (id)
  CREATE INDEX product_id ON inventory (product_id)
  CREATE INDEX store_id ON inventory (store_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table notification
--

DROP TABLE IF EXISTS notification;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE notification_seq;

CREATE TABLE IF NOT EXISTS notification (
  notif_id int CHECK (notif_id > 0) NOT NULL DEFAULT NEXTVAL ('notification_seq'),
  store_id int CHECK (store_id > 0) NOT NULL,
  notification varchar(256) NOT NULL,
  type enum('simple','optional','payment','action') NOT NULL,
  PRIMARY KEY (notif_id)
  CREATE INDEX store_id ON notification (store_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table orders
--

DROP TABLE IF EXISTS orders;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE orders_seq;

CREATE TABLE IF NOT EXISTS orders (
  order_id int CHECK (order_id > 0) NOT NULL DEFAULT NEXTVAL ('orders_seq'),
  store_id int CHECK (store_id > 0) NOT NULL,
  customer_mobile varchar(10) DEFAULT NULL,
  paid_amount int CHECK (paid_amount > 0) NOT NULL,
  PRIMARY KEY (order_id)
  CREATE INDEX store_id ON orders (store_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table preferences
--

DROP TABLE IF EXISTS preferences;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE preferences_seq;

CREATE TABLE IF NOT EXISTS preferences (
  id int CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('preferences_seq'),
  user_id varchar(8) NOT NULL,
  kyc enum('approved','upapproved') NOT NULL,
  theme_mode enum('light','dark','system','') NOT NULL,
  PRIMARY KEY (id)
  CREATE INDEX user_id ON preferences (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table sold_item
--

DROP TABLE IF EXISTS sold_item;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE sold_item_seq;

CREATE TABLE IF NOT EXISTS sold_item (
  item_id int CHECK (item_id > 0) NOT NULL DEFAULT NEXTVAL ('sold_item_seq'),
  order_id int CHECK (order_id > 0) NOT NULL,
  quantity int CHECK (quantity > 0) NOT NULL,
  product_id int CHECK (product_id > 0) NOT NULL,
  PRIMARY KEY (item_id)
  CREATE INDEX order_id ON sold_item (order_id)
  CREATE INDEX product_id ON sold_item (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table store
--

DROP TABLE IF EXISTS store;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE store_seq;

CREATE TABLE IF NOT EXISTS store (
  store_id int CHECK (store_id > 0) NOT NULL DEFAULT NEXTVAL ('store_seq'),
  user_id varchar(8) NOT NULL,
  address varchar(64) DEFAULT NULL,
  mobile varchar(10) DEFAULT NULL,
  shop_name varchar(64) DEFAULT NULL,
  PRIMARY KEY (store_id)
  CREATE INDEX user_id ON store (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table super_product
--

DROP TABLE IF EXISTS super_product;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE IF NOT EXISTS super_product (
  product_id int CHECK (product_id > 0) NOT NULL,
  product_name varchar(64) NOT NULL,
  category_id int CHECK (category_id > 0) NOT NULL,
  brand_id int CHECK (brand_id > 0) NOT NULL,
  description int NOT NULL,
  unit_id int CHECK (unit_id > 0) NOT NULL,
  mrp int NOT NULL,
  product_img varchar(256) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  updated_at timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (product_id)
  CREATE INDEX category_id ON super_product (category_id)
  CREATE INDEX brand_id ON super_product (brand_id)
  CREATE INDEX unit_id ON super_product (unit_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table transaction
--

DROP TABLE IF EXISTS transaction;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE transaction_seq;

CREATE TABLE IF NOT EXISTS transaction (
  txn_id int CHECK (txn_id > 0) NOT NULL DEFAULT NEXTVAL ('transaction_seq'),
  order_id int CHECK (order_id > 0) NOT NULL,
  txn_no varchar(64) NOT NULL,
  txn_mode enum('upi','cash') NOT NULL,
  txn_status enum('failed','complete') NOT NULL,
  amount int CHECK (amount > 0) NOT NULL,
  created_at timestamp NOT NULL,
  PRIMARY KEY (txn_id)
  CREATE INDEX order_id ON transaction (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table unit_table
--

DROP TABLE IF EXISTS unit_table;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE unit_table_seq;

CREATE TABLE IF NOT EXISTS unit_table (
  unit_id int CHECK (unit_id > 0) NOT NULL DEFAULT NEXTVAL ('unit_table_seq'),
  unit varchar(64) NOT NULL,
  PRIMARY KEY (unit_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- SQLINES DEMO *** ---------------------------------------

--
-- SQLINES DEMO *** or table user
--

DROP TABLE IF EXISTS user;
-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE user_seq;

CREATE TABLE IF NOT EXISTS user (
  id int CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('user_seq'),
  user_id varchar(8) DEFAULT NULL,
  firstName varchar(64) DEFAULT NULL,
  lastName varchar(64) DEFAULT NULL,
  gender enum('m','f','o') DEFAULT NULL,
  email varchar(64) DEFAULT NULL,
  mobile varchar(10) NOT NULL,
  password varchar(64) NOT NULL,
  created_at datetime NOT NULL DEFAULT current_timestamp(),
  modified_at datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  UNIQUE KEY mobile (mobile),
  UNIQUE KEY email (email),
  KEY user_id (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- SQLINES DEMO *** table user
--

INSERT INTO user (id, user_id, firstName, lastName, gender, email, mobile, password, created_at, modified_at) VALUES
(1, '', NULL, NULL, NULL, NULL, '8830569128', '57e4eb4c3a3afc978d221e2d8f15592d', '2021-12-19 08:58:00', '2021-12-19 08:58:00'),
(3, 'pradipt2', 'Pradipt', 'Tiwari', 'm', 'pradipt.singham@gmail.com', '8010698655', '25d55ad283aa400af464c76d713c07ad', '2021-12-22 12:57:47', '2021-12-22 12:57:47'),
(8, NULL, NULL, NULL, NULL, NULL, '8830569129', '$2b$10$6xsYDR9kENDHaaByrTubpO5ITpCosjLo2pqlOvtqx514AXayRXt.a', '2021-12-25 10:45:29', '2021-12-25 10:45:29'),
(10, NULL, NULL, NULL, NULL, NULL, '8830569120', '$2b$10$xdmIZutyQIomAx.43NK/luL.FKLPzYdCCVra12deNQvcqISBSGeqy', '2021-12-25 10:47:42', '2021-12-25 10:47:42'),
(12, NULL, NULL, NULL, NULL, NULL, '8830569121', '$2b$10$ZuqiO8KLesn0PLPBDs7xt.P1RiHARduk6GNObFIc18RpdsmGEdUaC', '2021-12-25 10:49:26', '2021-12-25 10:49:26'),
(13, NULL, NULL, NULL, NULL, NULL, '5487213265', '$2b$10$eqw2UAqCZwKyn29Fdqkcx.W1E7GCCl6yzqRkKbSi5XCtFITyiEdnG', '2021-12-25 10:54:16', '2021-12-25 10:54:16'),
(15, NULL, NULL, NULL, NULL, NULL, '5487213268', '$2b$10$YNgPsb.FH4kGnY7GlM63d.VTUiEvLn8u8l4yTlaQ7/dL/Ix/xPYCC', '2021-12-25 10:58:47', '2021-12-25 10:58:47'),
(16, NULL, NULL, NULL, NULL, NULL, '5487213274', '$2a$10$1q/kcgDLM1qNR.SWXzwPOepRmbsWMS80KiPc6YRFXYrmL/VpL.4VC', '2021-12-25 11:42:56', '2021-12-25 11:42:56');

--
-- SQLINES DEMO *** umped tables
--

--
-- SQLINES DEMO *** able banking_upi
--
ALTER TABLE banking_upi
  ADD CONSTRAINT banking_upi_ibfk_1 FOREIGN KEY (store_id) REFERENCES store (store_id);

--
-- SQLINES DEMO *** able inventory
--
ALTER TABLE inventory
  ADD CONSTRAINT inventory_ibfk_1 FOREIGN KEY (product_id) REFERENCES super_product (product_id),
  ADD CONSTRAINT inventory_ibfk_2 FOREIGN KEY (store_id) REFERENCES store (store_id);

--
-- SQLINES DEMO *** able notification
--
ALTER TABLE notification
  ADD CONSTRAINT notification_ibfk_1 FOREIGN KEY (store_id) REFERENCES store (store_id);

--
-- SQLINES DEMO *** able orders
--
ALTER TABLE orders
  ADD CONSTRAINT orders_ibfk_1 FOREIGN KEY (store_id) REFERENCES store (store_id);

--
-- SQLINES DEMO *** able preferences
--
ALTER TABLE preferences
  ADD CONSTRAINT preferences_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id);

--
-- SQLINES DEMO *** able sold_item
--
ALTER TABLE sold_item
  ADD CONSTRAINT sold_item_ibfk_1 FOREIGN KEY (order_id) REFERENCES orders (order_id),
  ADD CONSTRAINT sold_item_ibfk_2 FOREIGN KEY (product_id) REFERENCES super_product (product_id);

--
-- SQLINES DEMO *** able store
--
ALTER TABLE store
  ADD CONSTRAINT store_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id);

--
-- SQLINES DEMO *** able super_product
--
ALTER TABLE super_product
  ADD CONSTRAINT super_product_ibfk_1 FOREIGN KEY (category_id) REFERENCES category (category_id),
  ADD CONSTRAINT super_product_ibfk_2 FOREIGN KEY (brand_id) REFERENCES brand (brand_id),
  ADD CONSTRAINT super_product_ibfk_3 FOREIGN KEY (unit_id) REFERENCES unit_table (unit_id);

--
-- SQLINES DEMO *** able transaction
--
ALTER TABLE transaction
  ADD CONSTRAINT transaction_ibfk_1 FOREIGN KEY (order_id) REFERENCES orders (order_id);
COMMIT;

/* SQLINES DEMO *** ER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/* SQLINES DEMO *** ER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/* SQLINES DEMO *** ON_CONNECTION=@OLD_COLLATION_CONNECTION */;
