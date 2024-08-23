// src/components/FormBirthdate.jsx
import React, { useState } from "react";
import { FormGroup, Button } from "reactstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const FormBirthdate = ({ birthdate, onChange, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "day":
        const day = parseInt(value, 10);
        if (isNaN(day) || day < 1 || day > 31) {
          error = "El día debe estar entre 1 y 31";
        }
        break;
      case "month":
        const month = parseInt(value, 10);
        if (isNaN(month) || month < 1 || month > 12) {
          error = "El mes debe estar entre 1 y 12";
        }
        break;
      case "year":
        const year = parseInt(value, 10);
        if (isNaN(year) || year < 1900 || year > 2024) {
          error = "El año debe estar entre 1900 y 2024";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    validate(name, value);
    onChange(name, value);
  };

  const handleSubmit = () => {
    const allErrors = {
      day: validate("day", birthdate.day),
      month: validate("month", birthdate.month),
      year: validate("year", birthdate.year),
    };
    onSubmit();
    setIsSubmitted(true);
    setErrors(allErrors);
    setIsFormDisabled(true);
  };

  return (
    <FormGroup
      style={{
        paddingTop: 10,
        width: "100%",
        borderRadius: 10,
      }}
    >
      <FloatingLabel controlId="floatingDay" label="Día" className="mb-3">
        <Form.Control
          type="number"
          name="day"
          placeholder=""
          value={birthdate.day}
          onChange={handleChange}
          disabled={isFormDisabled}
          isInvalid={!!errors.day}
        />
        <Form.Control.Feedback type="invalid">
          {errors.day}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingMonth" label="Mes" className="mb-3">
        <Form.Control
          type="number"
          name="month"
          placeholder=""
          value={birthdate.month}
          onChange={handleChange}
          disabled={isFormDisabled}
          isInvalid={!!errors.month}
        />
        <Form.Control.Feedback type="invalid">
          {errors.month}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingYear" label="Año" className="mb-3">
        <Form.Control
          type="number"
          name="year"
          placeholder=""
          value={birthdate.year}
          onChange={handleChange}
          disabled={isFormDisabled}
          isInvalid={!!errors.year}
        />
        <Form.Control.Feedback type="invalid">
          {errors.year}
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

export default FormBirthdate;
