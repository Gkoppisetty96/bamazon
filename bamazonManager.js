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

// run manager prompts
function start() {
    // console.log ("Prompt Manager");

    // Prompt the manager to select an action
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],

            filter: function (val) {
                if (val === 'View Products for Sale') {
                    console.log("stock")
                    return 'currentStock';
                } else if (val === 'View Low Inventory') {
                    console.log("low");
                    return 'lowInventory';
                } else if (val === 'Add to Inventory') {
                    console.log("add");
                    return 'addInventory';
                } else if (val === 'Add New Product') {
                    console.log("new");
                    return 'newProduct';
                } else {
                    console.log('ERROR: Unsupported operation!');
                    exit(1);
                }
            }
        }
    ]).then(function (input) {
        var action = input.option;
        
        console.log ("manager selected " + action);
        // trigger appropriate action
        switch (action) {
            case "currentStock":
                currentStock();
                break;
            case "lowInventory":
                lowStock();
                break;
            case "addInventory":
                addStock();
                break;
            case "newProduct":
                createNewProduct();
                break;
            default:
                console.log("This doesn't look right. Can you try again?");
                start();
                break;
        }
    })
}

function currentStock() {
    // query from database
    queryStr = "SELECT * FROM products";

    // make the query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log("Existing Inventory: \n")
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
        connection.end();
    })
}

function lowStock() {
    // query from database
    queryStr = "SELECT * FROM products WHERE stock_quantity < 100";

    // make the query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log("Low Inventory (below 100): \n")
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
        connection.end();
    })
}


// make sure to supply positive numbers
function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

// make sure to supply positive numbers
function validateNumeric(value) {
    // Value must be a positive number
    var number = (typeof parseFloat(value)) === 'number';
    var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    } else {
        return 'Please enter a positive number for the unit price.'
    }
}




function addStock() {
    //  prompt selection
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID for stock_count update.',
            validate: validateInteger,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to add?',
            validate: validateInteger,
            filter: Number
        }
    ]).then(function (input) {
        var item = input.item_id;
        var addQuantity = input.quantity;

        // query the db
        var queryStr = "SELECT * FROM PRODUCTS WHERE ?";

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID
            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addInventory();

            } else {
                var productData = data[0];

                console.log('Updating Inventory...');

                // Construct the updating query string
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;

                // Update the inventory
                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;

                    console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + ".\n");

                    // End the database connection
                    connection.end();
                })
            }
        })

    })
}

function createNewProduct() {
    // prompt info about new product
    inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
            message: 'What is this product\'s name?',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
			validate: validateNumeric
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
			validate: validateInteger
		}
	]).then (function (input){
        console.log ("Adding new item: \n product: " + input.product_name + "\n department: " + input.department_name+ "\n price: " + input.price + "\n stock: " + input.stock_quantity);

        // create insert statement
        var queryStr = "INSERT INTO products SET ?" ;

        // add new product
        connection.query(queryStr,input,function(err, results, fields) {
            if (err) throw err;

            console.log("New product has been added to the inventory under Item ID " + results.insertId + ".\n");

            connection.end();
        })
    })
}