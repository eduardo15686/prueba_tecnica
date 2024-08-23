import React, { useState, useEffect, useRef } from "react";
import FormName from "./FormName";
import FormContact from "./FormContact";
import FormBirthdate from "./FormBirthdate";
import { Container, Button, Row, Col, Form } from "reactstrap";
import "../App.css";
import ProfilePhoto from "../../styles/ProfilePhoto";
import { TbFolderQuestion } from "react-icons/tb";
import { CiTimer } from "react-icons/ci";
import {
  headerStyle,
  containerStyle,
  profilePhotoContainer,
  infoBoxStyle,
  buttonStyle,
  finalInfoStyle,
} from "../../styles/Styles";
import "../../styles/ProgressBar.css";
import CreateUser from "./CreateUser";

const FormChat = () => {
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [progress, setProgress] = useState(100);
  const [infoUser, setInfoUser] = useState({
    nombre: {
      nombre: "",
      segundoNombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
    contacto: {
      email: "",
      telefono: "",
    },
    birthdate: {
      day: "",
      month: "",
      year: "",
    },
  });
  const [showName, setShowName] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBirthdate, setShowBirthdate] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress((timeRemaining / 300) * 100);
  }, [timeRemaining]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showName, showContact, showBirthdate]);

  const handleNameChange = (field, value) => {
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      nombre: {
        ...prevInfoUser.nombre,
        [field]: value,
      },
    }));
  };

  const handleSubmitName = () => {
    setShowName(true);
  };

  const handleContactChange = (field, value) => {
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      contacto: {
        ...prevInfoUser.contacto,
        [field]: value,
      },
    }));
  };

  const handleSubmitContact = () => {
    setShowContact(true);
  };

  const handleBirthdateChange = (field, value) => {
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      birthdate: {
        ...prevInfoUser.birthdate,
        [field]: value,
      },
    }));
  };

  const handleSubmitBirthdate = () => {
    setShowBirthdate(true);
  };

  const submitInfo = () => {
    console.log(infoUser);
    const formatdate = new Date(
      infoUser.birthdate.year,
      infoUser.birthdate.month - 1,
      infoUser.birthdate.day
    );
    console.log(formatdate);
  };

  return (
    <Container>
      <Container style={headerStyle}>
        <Row>
          <Col xs={8} style={{ marginBottom: 20 }}>
            <h4>Registro de Usuarios</h4>
          </Col>
          <Col xs={4} style={{ textAlign: "center" }}>
            <TbFolderQuestion size={60} />
          </Col>
        </Row>
        <Row>
          <Col xs={1}>
            <CiTimer size={25} />
          </Col>
          <Col xs={7}>
            <p>En menos de 5 minutos</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container style={containerStyle}>
        <Row>
          <Col xs={2}>
            <ProfilePhoto />
          </Col>
          <Col xs={9} style={profilePhotoContainer}>
            <Form>
              <FormName
                nombre={infoUser.nombre}
                onChange={handleNameChange}
                onSubmit={handleSubmitName}
              />
            </Form>
          </Col>
        </Row>
      </Container>

      {showName && (
        <Container>
          <div style={infoBoxStyle}>
            <p>
              <b>Nombre: </b>
              {`${infoUser.nombre.nombre} ${infoUser.nombre.segundoNombre} ${infoUser.nombre.apellidoPaterno} ${infoUser.nombre.apellidoMaterno}`}
            </p>
          </div>
        </Container>
      )}
      {showName && (
        <Container style={containerStyle}>
          <Row>
            <Col xs={2}>
              <ProfilePhoto />
            </Col>
            <Col xs={9} style={profilePhotoContainer}>
              <FormContact
                contact={infoUser.contacto}
                onChange={handleContactChange}
                onSubmit={handleSubmitContact}
              />
            </Col>
          </Row>
        </Container>
      )}

      {showContact && (
        <Container>
          <div style={infoBoxStyle}>
            <p>
              <b>Email: </b>
              {infoUser.contacto.email}
            </p>
            <p>
              <b>Teléfono: </b>
              {infoUser.contacto.telefono}
            </p>
          </div>
        </Container>
      )}

      {showContact && (
        <Container style={containerStyle}>
          <Row>
            <Col xs={2}>
              <ProfilePhoto />
            </Col>
            <Col xs={9} style={profilePhotoContainer}>
              <FormBirthdate
                birthdate={infoUser.birthdate}
                onChange={handleBirthdateChange}
                onSubmit={handleSubmitBirthdate}
              />
            </Col>
          </Row>
        </Container>
      )}

      {showBirthdate && (
        <Container>
          <div style={infoBoxStyle}>
            <p>
              <b>Fecha de Nacimiento: </b>
              {`${infoUser.birthdate.day}/${infoUser.birthdate.month}/${infoUser.birthdate.year}`}
            </p>
          </div>
        </Container>
      )}

      <div ref={endOfMessagesRef} />
      {showBirthdate && (
        <>
          <Container>
            <CreateUser userInfo={infoUser} />
          </Container>
          <Container style={finalInfoStyle}>
            <p className="no-padding">
              <b>Nombre: </b>{" "}
              {`${infoUser.nombre.nombre} ${infoUser.nombre.segundoNombre} ${infoUser.nombre.apellidoPaterno} ${infoUser.nombre.apellidoMaterno}`}
            </p>
            <p className="no-padding">
              <b>Email: </b> {infoUser.contacto.email}
            </p>
            <p className="no-padding">
              <b>Teléfono: </b>
              {infoUser.contacto.telefono}
            </p>
            <p className="no-padding">
              <b>Fecha de Nacimiento: </b>
              {`${infoUser.birthdate.day}/${infoUser.birthdate.month}/${infoUser.birthdate.year}`}
            </p>
          </Container>
        </>
      )}
    </Container>
  );
};

export default FormChat;
