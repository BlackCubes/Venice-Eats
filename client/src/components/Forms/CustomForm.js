import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { fieldInputProperties, fieldInputErrors } from './../HOC/withField';

import FormCustomInputs from './../Inputs/FormCustomInputs';

export default props => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    inputPropList,
    inputErrList
  } = props;

  const inputProperties = inputPropList.map(prop => {
    fieldInputProperties(
      prop.type,
      prop.name,
      prop.placeholder,
      touched,
      errors,
      handleChange,
      handleBlur
    );
  });

  const inputErrors = inputErrList.map(prop => {
    fieldInputErrors(prop.name, touched, errors);
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormCustomInputs properties={inputProperties} errors={inputErrors} />

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
