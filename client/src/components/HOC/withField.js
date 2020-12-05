import React from 'react';
import FormControl from 'react-bootstrap/FormControl';

export const fieldInputProperties = (type, name, placeholder, apiError) => ({
  touched,
  errors,
  handleChange,
  handleBlur
}) => {
  return {
    type,
    name,
    placeholder,
    className: touched[name] && errors[name] ? 'error' : null,
    onChange: handleChange,
    onBlur: handleBlur,
    isInvalid: !!errors[name] || !!apiError
  };
};

export const fieldInputErrors = name => ({ touched, errors }) => {
  return touched[name] && errors[name] ? (
    <FormControl.Feedback type="invalid">{errors[name]}</FormControl.Feedback>
  ) : null;
};
