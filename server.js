const express = require("express");
const app = express();
const {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require("./db/employees.js");
const { getDepartments } = require("./db/departments.js");

app.use(express.json());

const client = require("./db/client.js");
client.connect();

app.get("/api/employees", async (req, res, next) => {
  try {
    const allEmployees = await getEmployees();
    res.send(allEmployees);
  } catch (err) {
    console.log("ERROR GETTING EMPLOYEES: ", err);
  }
});

app.get("/api/departments", async (req, res, next) => {
  try {
    const allDepartments = await getDepartments();
    res.send(allDepartments);
  } catch (err) {
    console.log("ERROR GETTING DEPARTMENTS: ", err);
  }
});

app.post("/api/employees", async (req, res, next) => {
  try {
    const newEmployee = await createEmployee(req.body.name, null);
    res.send(newEmployee);
  } catch (err) {
    console.log("ERROR ADDING EMPLOYEE: ", err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employeeId = req.params.id;

    await deleteEmployee(employeeId);
  } catch (err) {
    console.log("ERROR DELETING EMPLOYEE: ", err);
  }
});

app.put("/api/employees/:id", async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const { name, department_id } = req.body;

    const updatedEmployee = await updateEmployee(
      employeeId,
      name,
      department_id
    );
    res.send(updatedEmployee);
  } catch (err) {
    console.log("ERROR UPDATING EMPLOYEE: ", err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
