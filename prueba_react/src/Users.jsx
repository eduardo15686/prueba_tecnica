// src/components/Users.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table } from 'react-bootstrap';

const GET_USERS = gql`
  query {
    getUsers {
      id
      nombre
      email
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.getUsers.map(({ id, nombre, email }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Users;
