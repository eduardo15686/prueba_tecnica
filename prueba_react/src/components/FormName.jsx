import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "reactstrap";

const FormName = ({ nombre, onChange, onSubmit }) => {
  const [errors, setErrors] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const handleChange = (event) => {
    onChange(event.target.name, event.target.value);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!nombre.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!nombre.apellidoPaterno)
      newErrors.apellidoPaterno = "El apellido paterno es obligatorio";
    if (!nombre.apellidoMaterno)
      newErrors.apellidoMaterno = "El apellido materno es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      onSubmit(); 
      setIsSubmitted(true); 
      setIsFormDisabled(true); 
    }
  };

  return (
    <FormGroup
      style={{
        paddingTop: 10,
        width: "100%",
        borderRadius: 10,
      }}
    >
      <FloatingLabel controlId="floatingNombre" label="Nombre" className="mb-3">
        <Form.Control
          type="text"
          name="nombre"
          placeholder=""
          value={nombre.nombre}
          onChange={handleChange}
          maxLength={20}
          disabled={isFormDisabled} 
          isInvalid={!!errors.nombre}
        />
        <Form.Control.Feedback type="invalid">
          {errors.nombre}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingSegundoNombre"
        label="Segundo Nombre"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="segundoNombre"
          placeholder=""
          value={nombre.segundoNombre}
          onChange={handleChange}
          maxLength={20}
          disabled={isFormDisabled}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingApellidoPaterno"
        label="Apellido Paterno"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="apellidoPaterno"
          placeholder=""
          value={nombre.apellidoPaterno}
          onChange={handleChange}
          maxLength={20}
          disabled={isFormDisabled}
          isInvalid={!!errors.apellidoPaterno}
        />
        <Form.Control.Feedback type="invalid">
          {errors.apellidoPaterno}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingApellidoMaterno"
        label="Apellido Materno"
        className="mb-3"
      >
        <Form.Control
          type="text"
          name="apellidoMaterno"
          placeholder=""
          value={nombre.apellidoMaterno}
          onChange={handleChange}
          maxLength={20}
          disabled={isFormDisabled} 
          isInvalid={!!errors.apellidoMaterno}
        />
        <Form.Control.Feedback type="invalid">
          {errors.apellidoMaterno}
        </Form.Control.Feedback>
      </FloatingLabel>
      {!isSubmitted && (
        <Button type="submit" onClick={handleSubmit} disabled={isFormDisabled}>
          Continuar
        </Button>
      )}
    </FormGroup>
  );
};

export default FormName;
