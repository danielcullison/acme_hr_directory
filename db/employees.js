const client = require("./client.js");

const createEmployee = async (employeeName, departmentId) => {
  try {
    const { rows } = await client.query(`
            INSERT INTO employee(name, department_id)
            VALUES ('${employeeName}', ${departmentId})
            RETURNING *;
        `);
    const employee = rows[0];
    return employee;
  } catch (err) {
    console.log("ERROR CREATING EMPLOYEE: ", err);
  }
};

const getEmployees = async () => {
  try {
    const { rows } = await client.query(`
            SELECT * FROM employee;
        `);
    return rows;
  } catch (err) {
    console.log("ERROR GETTING EMPLOYEES: ", err);
  }
};

const deleteEmployee = async (employeeId) => {
  try {
    await client.query(
      `
        DELETE FROM employee WHERE id = $1
      `,
      [employeeId]
    );
  } catch (err) {
    console.log("ERROR DELETING EMPLOYEE: ", err);
  }
};

const updateEmployee = async (employeeId, name, department_id) => {
  try {
    const { rows } = await client.query(
      `
        UPDATE employee
        SET name = $2, department_id = $3
        WHERE id = $1
        RETURNING *;
      `,
      [employeeId, name, department_id]
    );
    return rows[0];
  } catch (err) {
    console.log("ERROR UPDATING EMPLOYEE: ", err);
  }
};

module.exports = {
  createEmployee: createEmployee,
  getEmployees: getEmployees,
  deleteEmployee: deleteEmployee,
  updateEmployee: updateEmployee
};
