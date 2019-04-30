// Require the packages
var inquirer = require('inquirer');
var mysql = require('mysql');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// show available stock
function start() {
    queryStr = "SELECT * FROM products";

    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log("Current Stock: \n");
        var stock = "";
        for (var i = 0; i < data.length; i++) {
            stock = "";
            stock += "Item ID: " + data[i].item_id + " | ";
            stock += "Product Name: " + data[i].product_name + " | ";
            stock += "Department: " + data[i].department_name + " | ";
            stock += "Price: $" + data[i].price + '\n';

            console.log(stock);
        }
        console.log("-------\n");

        // prompt user purchase
        purchasePrompt();
    });
}

// make sure that the user is supplying positive integers only
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && sign === 1) {
        return true;
    } else {
        return "Please enter a non-zero number";
    }
}

// prompt the user to make a purchase
function purchasePrompt() {
    // console.log("PurchasePrompt initiated")

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the item ID that you would like to purchase',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        // console.log ("Customer selected " + input.quantity + " of " + input.item_id);

        var item = input.item_id;
        var quantity = input.quantity;

        // check stock
        var queryStr = "Select * FROM products WHERE ?";

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            // if invalid item ID:
            if (data.length === 0) {
                console.log("Error: invalid item ID. Please select again.");
                start();

            } else {
                var productData = data[0];

                // console.log ("Product Data : \n"+ JSON.stringify(productData));

                // if in stock
                if (quantity <= productData.stock_quantity) {
                    console.log("This product is in stock! Placing order now!");

                    // update query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    // update stock
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log("Your order has been placed. \n Your total is $" + productData.price * quantity);
                        console.log("Thank you for shopping with us!");
                        connection.end();
                    })
                } else {
                    console.log("Sorry, we don't currently have enough product in stock. \n Please modify your order.");
                    start();
                }
            }
        })
    })
}