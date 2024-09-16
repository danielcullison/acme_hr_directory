const client = require("./client.js");
const { createEmployee } = require("./employees.js");
const { createDepartment } = require("./departments.js");

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS employee;
            DROP TABLE IF EXISTS department;
        `);
  } catch (err) {
    console.log("ERROR DROPPING TABLES: ", err);
  }
};

const createTables = async () => {
  try {
    await client.query(`
            CREATE TABLE department (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );

            CREATE TABLE employee (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now(),
                department_id INTEGER REFERENCES department(id)
            );
        `);
  } catch (err) {
    console.log("ERROR CREATING TABLES: ", err);
  }
};

const init = async () => {
  await client.connect();

  await dropTables();

  await createTables();

  const finance = await createDepartment("Finance");

  const operations = await createDepartment("Operations");

  const marketing = await createDepartment("Marketing");

  await createEmployee("Daniel", finance.id);

  await createEmployee("James", operations.id);

  await createEmployee("John", marketing.id);
};

init();
