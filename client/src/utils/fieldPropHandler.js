import React from 'react';
import { getIn } from 'formik';
import FormControl from 'react-bootstrap/FormControl';

export const fieldInputProperties = (
  type,
  name,
  placeholder,
  apiError,
  values,
  touched,
  errors,
  handleChange,
  handleBlur
) => {
  return {
    type,
    name,
    // defaultValue: values[name],
    defaultValue: getIn(values, name),
    placeholder,
    // className: touched[name] && errors[name] ? 'error' : null,
    className: getIn(touched, name) && getIn(errors, name) ? 'error' : null,
    onChange: handleChange,
    onBlur: handleBlur,
    // isInvalid: !!errors[name] || !!apiError
    isInvalid: !!getIn(errors, name) || !!apiError
  };
};

export const fieldInputErrors = (name, touched, errors) => {
  // return touched[name] && errors[name] ? (
  return getIn(touched, name) && getIn(errors, name) ? (
    // <FormControl.Feedback type="invalid">{errors[name]}</FormControl.Feedback>
    <FormControl.Feedback type="invalid">
      {getIn(errors, name)}
    </FormControl.Feedback>
  ) : null;
};
