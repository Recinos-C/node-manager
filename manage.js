var inquirer = require("inquirer");
var table = require("console.table");
// var orm = require("./Develop/orm");
// var app = require("./server");
// var table = require("console.table");
var mysql = require("mysql");
var express = require("express");
// var manage = require("./manage.js")
var app = express();
var PORT = process.env.PORT || 8080;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Najih_56@Forna",
    database: "employee_managerDB"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    promptUser();
});
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});

function promptUser() {
    console.log("---------------------------------------------------------")
    console.log("\n")
    console.log("\n")
    console.log("            WELCOME TO EMPLOYEE MANAGER!!!              ")
    console.log("\n")
    console.log("\n")
    console.log("---------------------------------------------------------")

    inquirer.prompt(

        {
            type: "list",
            name: "manage",
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view all employees by department",
                "view all employees by manager",
                "add employee",
                "add department",
                "add role",
                "update employee role",
                "update employee manager",
                "view all employee roles",
                "remove department",
                "remove employee",
                "exit"
            ]
        }).then(function (answer) {

        switch (answer.manage) {
            case "View all employees":
                selectAll();
                break;

            case "View all employees by department":
                showAllDept();
                break;

            case "View all employees by manager":
                showAllManager();
                break;

            case "view all employee roles":
                showAllRole();
                break;

            case "add employee":
                addEmployee();
                break;

            case "add department":
                addDept();
                break;

            case "add role":
                addRole();
                break;

            case "update employee role":
                updateRole();
                break;

            case "update employee manager":
                updateManager();
                break;

            case "remove department":
                remove();
                break;

            case "remove employee":
                remove();
                break;

            case "exit":
                exit();
                break;

        };


    });
};

function selectAll() {
    var employee_table = "SELECT * FROM employees";
    connection.query(employee_table, function (err, res) {
        console.table(res);
        if (err) throw err;
        return res
    })
    exit();
}

function showAllManager() {
    var manager_table = "SELECT * FROM managers";
    connection.query(manager_table, function (err, res) {
        console.table(res);
        if (err) throw err;
        return res
    })
    exit();
}

function showAllDept() {
    var dept_table = "SELECT * FROM departments";
    connection.query(dept_table, function (err, res) {
        console.table(res);
        if (err) throw err;
        return res
    })
    exit();
}

function showAllRole() {
    var role_table = "SELECT * FROM roles";
    connection.query(role_table, function (err, res) {
        console.table(res);
        if (err) throw err;
        return res
    })
    exit();
}
function addEmployee() {

    var newEmployee = "INSERT INTO employees" +
        "(employee_id, name,role,department, manager)" +
        "VALUES( ?,?,?,?,?)";

    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the employee?"
        },
        {
            type: "input",
            name: "employee_id",
            message: "Please input the employees id?"
        },
        {
            type: "input",
            name: "manager",
            message: "Who is the employees manager?"
        },
        {
            type: "input",
            name: "role",
            message: "What is the employees role?"
        },
        {
            type: "input",
            name: "department",
            message: "What is the employees department?"
        }
    ]).then(data => {
        connection.query(newEmployee, [data.name, data.employee_id, data.manager, data.role, data.department], function (err) {
            if (err) throw err;
        })
        console.log("Success employee added!")
    })

    exit();
};

function addDept() {

    var newDept = "INSERT INTO departments" +
        "(name, manager)" +
        "VALUES(?,?)";

    inquirer.prompt([{
            type: "input",
            name: "department",
            message: "What is the name of the new department?",
        }
        // {
        //     type: "input",
        //     name: "manager",
        //     message: "Who is the manager for the department?"
        // },
        // {
        //     type: "input",
        //     name: "employee",
        //     message: "Who works in this department?"
        // },
    ]).then(data => {

        connection.query(newDept, [data.department], function (err) {
            if (err) throw err;
        })
        console.log("Success! Department added")
    });
    exit();
};


function addRole() {
    var newRole = "INSERT INTO roles" +
        "(name)" +
        "VALUES(?)";

    inquirer.prompt([{
        type: "input",
        name: "role",
        message: "What is the name of the new role?",
    }]).then(data => {

        connection.query(newRole, [data.role], function (err) {
            if (err) throw err;
        })
        console.log("Success! Role added!")
    });;
    exit();
};

// function updateRole() {

// }

function remove() {
    var removeItem = "DELETE FROM " + table + "WHERE name = ?"

        inquirer.prompt([{
            type: "list",
            name: "item",
            message: "Which would you like to remove?",
            choices: function(){
                var arrChoices = [];
                for(i = 0;i< res.length;i++){
                    arrChoices.push(result[i].name)
                }
                return arrChoices
            }
        }]).then(data => {

            connection.query(newRole, [data.role], function (err) {
                if (err) throw err;
            })
            console.log("Success! Role added!")
        });;
    exit();

}

function exit() {

    inquirer.prompt([{
            type: "list",
            name: "quit",
            message: "What would like to run the program again?",
            choice: ["Run", "Quit"]
        },

    ]).then(function (answer) {
        if (answer.quit === "Run") {
            promptUser()
        } else {
            connection.end();
        };
    });
};

// module.exports = manage;