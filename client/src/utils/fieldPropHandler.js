import React from 'react';
import { getIn } from 'formik';
import FormControl from 'react-bootstrap/FormControl';

// export const fieldInputProperties = (
//   type,
//   name,
//   placeholder,
//   apiError,
//   values,
//   touched,
//   errors,
//   handleChange,
//   handleBlur,
//   as
// ) => {
//   return {
//     type,
//     name,
//     defaultValue: getIn(values, name),
//     placeholder,
//     className: getIn(touched, name) && getIn(errors, name) ? 'error' : null,
//     onChange: handleChange,
//     onBlur: handleBlur,
//     isInvalid: !!getIn(errors, name) || !!apiError,
//     as
//   };
// };

export const fieldInputProperties = (changes, static) => {
  return {
    defaultValue: getIn(changes.values, static.name),
    className:
      getIn(changes.touched, static.name) && getIn(changes.errors, static.name)
        ? 'error'
        : null,
    onChange: changes.handleChange,
    onBlur: changes.handleBlur,
    isInvalid: !!getIn(changes.errors, static.name) || !!changes.apiError,
    ...static
  };
};

export const fieldInputErrors = (name, touched, errors) => {
  return getIn(touched, name) && getIn(errors, name) ? (
    <FormControl.Feedback type="invalid">
      {getIn(errors, name)}
    </FormControl.Feedback>
  ) : null;
};
