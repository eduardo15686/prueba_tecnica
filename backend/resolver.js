const pool = require("./database/conexion");

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const [rows] = await pool.query(
        "SELECT * FROM users_test_EduardoRivasSoria WHERE id = ?",
        [id]
      );
      return rows[0];
    },
    getUsers: async () => {
      const [rows] = await pool.query(
        "SELECT * FROM users_test_EduardoRivasSoria"
      );
      return rows;
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const {
        nombre,
        segundo_nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        email,
        telefono,
      } = args;
      const [result] = await pool.query(
        "INSERT INTO users_test_EduardoRivasSoria (nombre, segundo_nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          nombre,
          segundo_nombre,
          apellido_paterno,
          apellido_materno,
          fecha_nacimiento,
          email,
          telefono,
        ]
      );
      const [rows] = await pool.query(
        "SELECT * FROM users_test_EduardoRivasSoria WHERE id = ?",
        [result.insertId]
      );
      return rows[0];
    },
  },
};

module.exports = { resolvers };
