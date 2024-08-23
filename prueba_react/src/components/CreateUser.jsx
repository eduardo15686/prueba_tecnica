// src/components/CreateUser.js
import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Form } from "react-bootstrap";

const CREATE_USER = gql`
  mutation CreateUser(
    $nombre: String!
    $segundo_nombre: String
    $apellido_paterno: String!
    $apellido_materno: String
    $fecha_nacimiento: Date
    $email: String!
    $telefono: String
  ) {
    createUser(
      nombre: $nombre
      segundo_nombre: $segundo_nombre
      apellido_paterno: $apellido_paterno
      apellido_materno: $apellido_materno
      fecha_nacimiento: $fecha_nacimiento
      email: $email
      telefono: $telefono
    ) {
      id
      nombre
      email
    }
  }
`;

const CreateUser = ({ userInfo }) => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = () => {
    const { day, month, year } = userInfo.birthdate;
    const formattedDate = `${year}-${month}-${day}`;

    createUser({
      variables: {
        nombre: userInfo.nombre.nombre,
        segundo_nombre: userInfo.nombre.segundoNombre,
        apellido_paterno: userInfo.nombre.apellidoPaterno,
        apellido_materno: userInfo.nombre.apellidoMaterno,
        fecha_nacimiento: formattedDate,
        email: userInfo.contacto.email,
        telefono: userInfo.contacto.telefono,
      },
    });
  };

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Button
        type="submit"
        style={{
          backgroundColor: "#fc64db",
          marginTop: 10,
          height: 50,
          width: "90%",
          border: "none",
        }}
      >
        <b>INICIAR</b>
      </Button>
      {data && <p>Usuario creado con el id: {data.createUser.id}</p>}
    </Form>
  );
};

export default CreateUser;
