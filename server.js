const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_tracker",
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  // run the start function after the connection is made to prompt the user
  return start();
});

function start() {
    return inquirer
      .prompt({
        name: "start",
        type: "list",
        message: "Would you like to do?",
        choices: ["Add Department", "Add Roles", "Add Employees", "View all Departments", "View all Roles", "View all Employees", "Update Employee Role"],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === "Add Department") {
          return addDepartment();
        } else if (answer.postOrBid === "Add Roles") {
          return addRole();
        } else if (answer.postOrBid === "Add Employees") {
            return addEmployee();
        } else if (answer.postOrBid === "View all Departments") {
            return viewDepartments();
        } else if (answer.postOrBid === "View all Roles") {
            return viewRoles();
        }else if (answer.postOrBid === "View all Employees") {
            return viewEmployees();
        }else if (answer.postOrBid === "Update Employee Role") {
            return updateEmployeeRole();
        } else {
          connection.end();
        }
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }