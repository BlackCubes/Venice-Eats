import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import {
  fieldInputProperties,
  fieldInputErrors
} from './../../utils/fieldPropHandler';

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
    inputErrList,
    isMountedRef
  } = props;

  const inputProperties = inputPropList.map(prop => {
    return fieldInputProperties(
      prop.type,
      prop.name,
      prop.placeholder,
      prop.apiError,
      touched,
      errors,
      handleChange,
      handleBlur
    );
  });

  const inputErrors = inputErrList.map(prop => {
    return fieldInputErrors(prop.name, touched, errors);
  });

  isMountedRef(values);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormCustomInputs properties={inputProperties} errors={inputErrors} />

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
