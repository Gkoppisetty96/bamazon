### BAMAZON

This application uses a command-line based storefront and a MySQL databse backend. This application presents two interfaces: customer and manager. 

![alt-text](/assets/thisimage)

##Customer

This allows the user to view the current store inventory: item IDs, descriptions, department, and price. 

![Current Inventory](/assets/customer_1.PNG)

The user can then purchase items using the item ID and entering the desired quantity. 

![User Purchase](/assets/customer_2.PNG)

If that quantity is in stock, the order goes through; this displays the purchase price and updates the store database.

![In Stock](/assets/customer_3.PNG)

If the store is out of stock, the user must modify their order. 

![Out of Stock](/assets/customer_4.PNG)

##Manager

This allows the user to choose between 4 options:

![Manager Options](/assets/manager_1.PNG)

This allows the user to view products for sale,  

![Manager Options](/assets/manager_2.PNG)

view low inventory, 

![Manager Options](/assets/manager_3.PNG)

add to inventory, 

![Manager Options](/assets/manager_4.PNG)

and create new products.

![Manager Options](/assets/manager_5.PNG)


## Running this Application

To run this application, the MySQL database should already be set up on your machine. You can visit MySQL (https://dev.mysql.com/) to install the version needed. 

You will be able to create the Bamazon database and the tables need with the SQL code found inside this application. Run this code to populate the database, and you can then begin to run the Bamazon interfaces.

After cloning the entire repository, you will need to run `npm install` to install the packages required. 