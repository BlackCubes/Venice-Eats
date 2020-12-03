import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default props => {
  const { errors, ...properties } = props;

  return (
    <FormGroup size="lg">
      <FormControl {...properties} />
      {errors}
    </FormGroup>
  );
};
