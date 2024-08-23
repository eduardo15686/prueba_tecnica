const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    nombre: String!
    email: String!
    segundo_nombre: String
    apellido_paterno: String!
    apellido_materno: String
    fecha_nacimiento: Date
    telefono: String
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(
      nombre: String!
      segundo_nombre: String
      apellido_paterno: String!
      apellido_materno: String
      fecha_nacimiento: Date
      email: String!
      telefono: String
    ): User
  }
`;

module.exports = { typeDefs };
