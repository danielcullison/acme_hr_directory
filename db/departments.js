const client = require("./client.js");

const createDepartment = async (departmentName) => {
  try {
    const { rows } = await client.query(`
            INSERT INTO department (name)
            VALUES ('${departmentName}')
            RETURNING *;
        `);

    const department = rows[0];
    return department;
  } catch (err) {
    console.log("ERROR CREATING DEPARTMENT: ", err);
  }
};

const getDepartments = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * FROM department;
        `);
        return rows;
    } catch (err) {
        console.log('ERROR GETTING DEPARTMENTS: ', err);
    }
};

module.exports = {
  createDepartment: createDepartment,
  getDepartments: getDepartments
};
