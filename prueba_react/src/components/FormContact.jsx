import React, { useState } from "react";
import { FormGroup, Button } from "reactstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const FormContact = ({ contact, onChange, onSubmit }) => {
  const [errors, setErrors] = useState({
    email: "",
    telefono: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "telefono") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      onChange(name, numericValue);
    } else {
      onChange(name, value);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!contact.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      newErrors.email = "El email no tiene un formato válido";
    }
    if (!contact.telefono) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (contact.telefono.length > 10) {
      newErrors.telefono = "El teléfono no puede tener más de 10 caracteres";
    }
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
    <Form onSubmit={handleSubmit}>
      <FormGroup
        style={{
          paddingTop: 10,
          width: "100%",
          borderRadius: 10,
        }}
      >
        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder=""
            value={contact.email}
            maxLength={50}
            onChange={handleChange}
            disabled={isFormDisabled}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTelefono"
          label="Teléfono"
          className="mb-3"
        >
          <Form.Control
            type="tel"
            name="telefono"
            maxLength={10}
            placeholder=""
            value={contact.telefono}
            onChange={handleChange}
            disabled={isFormDisabled}
            isInvalid={!!errors.telefono}
            pattern="\d{1,10}"
            title="El teléfono debe ser un número de hasta 10 dígitos"
          />
          <Form.Control.Feedback type="invalid">
            {errors.telefono}
          </Form.Control.Feedback>
        </FloatingLabel>
        {!isSubmitted && (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isFormDisabled}
          >
            Continuar
          </Button>
        )}
      </FormGroup>
    </Form>
  );
};

export default FormContact;
