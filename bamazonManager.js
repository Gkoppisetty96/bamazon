// Require the packages
var inquirer = require('inquirer');
var mysql = require('mysql');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
                    return 'currentStock';
                } else if (val === 'View Low Inventory') {
                    return 'lowInventory';
                } else if (val === 'Add to Inventory') {
                    return 'addInventory';
                } else if (val === 'Add New Product') {
                    return 'newProduct';
                } else {
                    console.log('ERROR: Unsupported operation!');
                    exit(1);
                }
            }
        }
    ]).then(function (input) {
        // console.log ("manager selected" + JSON.stringify(input));
        var action = JSON.stringify(input);
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
                console.log ("This doesn't look right. Can you try again?");
        }
    })
}

function currentStock () {
    
}

function lowStock () {

}

function addStock () {

}

function createNewProduct () {

}