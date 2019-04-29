### BAMAZON

This application uses a command-line based storefront and a MySQL databse backend. This application presents one interface: customer. 

![alt-text](/assets/thisimage)


## Running this Application

To run this application, the MySQL database should already be set up on your machine. You can visit MySQL (https://dev.mysql.com/) to install the version needed. 

You will be able to create the Bamazon database and the tables need with the SQL code found inside this application. Run this code to populate the database, and you can then begin to run the Bamazon interfaces.

After cloning the entire repository, you will need to run `npm install` to install the packages required. 

#Customer

This allows the user to view the current store inventory: item IDs, descriptions, department, and price. The user can then purchase items using the item ID and entering the desired quantity. If that quantity is in stock, the order goes through; this displays the purchase price and updates the store database. If the store is out of stock, the user must modify their order. 

