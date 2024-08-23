const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "testing",
  password: "Pruebas%ALI%2020",
  database: "testing_ali_fullstack",
});

// const pool = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "admin123",
//   database: "mi_base_de_datos",
// });
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users_test_EduardoRivasSoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50),
    fecha_nacimiento DATE,
    email VARCHAR(50) UNIQUE NOT NULL,
    telefono VARCHAR(10)
  );
`;

async function createTable() {
  const connection = await pool.getConnection();
  try {
    await connection.query(createTableQuery);
    console.log("Tabla creada con éxito o ya existe.");
  } catch (err) {
    console.error("Error al crear la tabla:", err);
  } finally {
    connection.release();
  }
}

async function testConnectionAndCreateTable() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Database connected:", rows);
    await createTable();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

testConnectionAndCreateTable();

module.exports = pool;
