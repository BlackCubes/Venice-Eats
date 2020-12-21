import React from 'react';
import { getIn } from 'formik';
import FormControl from 'react-bootstrap/FormControl';

export const fieldInputProperties = (propChanges, propStatic) => {
  return {
    defaultValue: getIn(propChanges.values, propStatic.name),
    className:
      getIn(propChanges.touched, propStatic.name) &&
      getIn(propChanges.errors, propStatic.name)
        ? 'error'
        : null,
    onChange: propChanges.handleChange,
    onBlur: propChanges.handleBlur,
    isInvalid:
      !!getIn(propChanges.errors, propStatic.name) || !!propChanges.apiError,
    ...propStatic
  };
};

export const fieldFileInputProperties = (propChanges, propStatic) => {
  return {
    defaultValue: getIn(propChanges.values, propStatic.name),
    className:
      getIn(propChanges.touched, propStatic.name) &&
      getIn(propChanges.errors, propStatic.name)
        ? 'error'
        : null,
    onChange: propChanges.handleChange,
    onBlur: propChanges.handleBlur,
    isInvalid:
      !!getIn(propChanges.errors, propStatic.name) || !!propChanges.apiError,
    ...propStatic
  };
};

export const fieldInputErrors = (name, touched, errors) => {
  return getIn(touched, name) && getIn(errors, name) ? (
    <FormControl.Feedback type="invalid">
      {getIn(errors, name)}
    </FormControl.Feedback>
  ) : null;
};
