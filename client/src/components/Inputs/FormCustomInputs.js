import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default props => {
  const { errors, ...properties } = props;

  return (
    <React.Fragment>
      <FormGroup size="lg">
        <FormControl {...properties} />
        {errors}
      </FormGroup>
    </React.Fragment>
  );
};
