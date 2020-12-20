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
    defaultValue: getIn(values, name),
    placeholder,
    className: getIn(touched, name) && getIn(errors, name) ? 'error' : null,
    onChange: handleChange,
    onBlur: handleBlur,
    isInvalid: !!getIn(errors, name) || !!apiError
  };
};

export const fieldInputErrors = (name, touched, errors) => {
  return getIn(touched, name) && getIn(errors, name) ? (
    <FormControl.Feedback type="invalid">
      {getIn(errors, name)}
    </FormControl.Feedback>
  ) : null;
};
