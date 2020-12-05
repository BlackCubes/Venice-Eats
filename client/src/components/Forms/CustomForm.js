import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import FormCustomInputs from './../Inputs/FormCustomInputs';

export default (inputProperties, inputErrors) => ({
  handleSubmit,
  isSubmitting
}) => {
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormCustomInputs properties={inputProperties} errors={inputErrors} />

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};
