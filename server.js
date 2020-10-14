const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

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
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Update Employee Role",
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "Add Department":
          return addDepartment();
        case "Add Role":
          return addRole();
        case "Add Employee":
          return addEmployee();
        case "View all Departments":
          return viewDepartments();
        case "View all Roles":
          return viewRoles();
        case "View all Employees":
          return viewEmployees();
        case "Update Employee Role":
          return updateEmployeeRole();
        default:
          return connection.end();
      }
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}

function addEmployee() {
  return inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is their first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is their last name?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is their role id?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is their manager id?",
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      return connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        (err) => {
          if (err) {
            throw err;
          }
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          return start();
        }
      );
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) {
      throw err;
    }
    console.log("displayed successfully!");
    console.table(res);
    // re-prompt the user for if they want to bid or post
    return start();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      throw err;
    }
    console.log("displayed successfully!");
    console.table(res);
    // re-prompt the user for if they want to bid or post
    return start();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) {
      throw err;
    }
    console.log("displayed successfully!");
    console.table(res);
    // re-prompt the user for if they want to bid or post
    return start();
  });
}

function addRole() {
  return inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is their title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is their salary?",
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is their department id?",
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      return connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId,
        },
        (err) => {
          if (err) {
            throw err;
          }
          console.log("Your role was created successfully!");
          // re-prompt the user for if they want to bid or post
          return start();
        }
      );
    });
}

function addDepartment() {
  return inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is its name?",
    })
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      return connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        (err) => {
          if (err) {
            throw err;
          }
          console.log("Your department was created successfully!");
          // re-prompt the user for if they want to bid or post
          return start();
        }
      );
    });
}

function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      throw err;
    }
    console.log("displayed successfully!");
    console.table(res);

    inquirer
      .prompt([
        {
          name: "roleId",
          type: "input",
          message: "What is role id?",
        },
        {
          name: "employeeId",
          type: "input",
          message: "What is employee id?",
        },
      ])
      .then((answer) => {
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.roleId,
            },
            {
              id: answer.employeeId,
            },
          ],
          (err, res) => {
            if (err) {
              throw err;
            }
            console.log(res.affectedRows + " employee updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            start();
          }
        );
      });
  });
}
