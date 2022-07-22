const inquirer = require("inquirer");
require("console.table");
const db = require("./server");

db.connect(function (err) {
  if (err) {
    throw err;
  }
  initialPrompt();
});

function initialPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then((data) => {
      switch (data.choices) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add an Employees":
          addEmployee();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Update an Employee":
          updateEmployee();
          break;
        default:
          console.log("Thanks for visiting. Now Exiting");
          process.exit();
      }
    });
}

function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);
    initialPrompt();
  });
}
function viewRoles() {
  db.query("SELECT * FROM roleOf", function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);
    initialPrompt();
  });
}
function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);
    initialPrompt();
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "Department_name",
        message: "What is the new Department to add?",
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO Department (name) VALUES (?)",
        [data.Department_name],
        function (err, res) {
          if (err) {
            throw err;
          }
          console.log("Success!");
          initialPrompt();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_name",
        message: "What is the new Role to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the new Role's salary?",
      },
      {
        type: "input",
        name: "department",
        message: "What is the new Role's department ID?",
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO roleOf (title, salary, department_id) VALUES (?, ?, ?)",
        [data.role_name, data.salary, data.department],
        function (err, res) {
          if (err) {
            throw err;
          }
          console.log("Success!");
          initialPrompt();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is the new Employee's First Name?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the new Employee's Last Name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the new Employee's Role?",
      },
      {
        type: "input",
        name: "employee_name",
        message: "What is the new Employee's manager's ID",
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO Department (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [data.firstname, data.lastname, data.role, data.employee_name],
        function (err, res) {
          if (err) {
            throw err;
          }
          console.log("Success!");
          initialPrompt();
        }
      );
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "What is the ID of the Employee to be changed?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the role ID of the Employee to be changed?",
      },
    ])
    .then((data) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [data.roleId, data.employeeId],
        // turn into ints
        function (err, res) {
          if (err) {
            throw err;
          }
          console.log("Success!");
          initialPrompt();
        }
      );
    });
}
initialPrompt();
