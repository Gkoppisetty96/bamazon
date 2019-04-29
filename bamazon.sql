-- Drop this database if it already exists, and create and use a database called "bamazon"
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- Create a products table
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the products table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Arizona Tea", "Grocery", 1.00, 600),
		("Bullet Journal", "Office", 25.75, 50),
        ("Suede Wallet", "Purses", 20.50, 75),
        ("Fountain Pen", "Office", 10.25, 50),
        ("Yoga Mat", "Sports", 15.25, 150),
        ("Succulent", "Outdoor", 2.75, 500),
        ("Ice Cream", "Grocery", 3.25, 500),
        ("Compact Mirror", "Cosmetics", 2.75, 500),
        ("Chewing Gum", "Grocery", 1.25, 1000),
        ("Dark Chocolate", "Grocery", 2.35, 500);