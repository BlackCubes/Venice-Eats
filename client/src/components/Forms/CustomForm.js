import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import { fieldInputProperties, fieldInputErrors } from './../HOC/withField';

import FormCustomInputs from './../Inputs/FormCustomInputs';

export default props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    inputPropList,
    inputErrList
  } = props;

  const fieldInputProperties = (
    type,
    name,
    placeholder
    // apiError
  ) => {
    return {
      type,
      name,
      placeholder,
      className: touched[name] && errors[name] ? 'error' : null,
      onChange: handleChange,
      onBlur: handleBlur,
      isInvalid: !!errors[name]
    };
  };

  const fieldInputErrors = name => {
    return touched[name] && errors[name] ? (
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    ) : null;
  };

  const inputProperties = inputPropList.map(prop => {
    fieldInputProperties(prop.type, prop.name, prop.placeholder);
  });

  const inputErrors = inputErrList.map(prop => {
    fieldInputErrors(prop.name);
  });

  // const inputProperties = inputPropList.map(prop => {
  //   fieldInputProperties(
  //     prop.type,
  //     prop.name,
  //     prop.placeholder,
  //     touched,
  //     errors,
  //     handleChange,
  //     handleBlur
  //   );
  // });

  // const inputErrors = inputErrList.map(prop => {
  //   fieldInputErrors(prop.name, touched, errors);
  // });

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormCustomInputs properties={inputProperties} errors={inputErrors} />

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
