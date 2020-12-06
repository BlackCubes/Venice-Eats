import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { fieldInputProperties, fieldInputErrors } from './../HOC/withField';

import FormCustomInputs from './../Inputs/FormCustomInputs';

export default (inputPropList, inputErrList, props) => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
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

  // const inputProperties = [
  //   fieldInputProperties(
  //     'email',
  //     'email',
  //     'Email',
  //     touched,
  //     errors,
  //     handleChange,
  //     handleBlur
  //   ),
  //   fieldInputProperties(
  //     'password',
  //     'password',
  //     'Password',
  //     touched,
  //     errors,
  //     handleChange,
  //     handleBlur
  //   )
  // ];

  // const inputErrors = [
  //   fieldInputErrors('email', touched, errors),
  //   fieldInputErrors('password', touched, errors)
  // ];

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormCustomInputs properties={inputProperties} errors={inputErrors} />

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
