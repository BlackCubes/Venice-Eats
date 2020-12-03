import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default props => {
  const { errors, properties } = props;

  const inputResult = (errors, properties) => {
    return properties.map((prop, key) => {
      return (
        <FormGroup key={key} size="lg">
          <FormControl {...prop} />
          {errors}
        </FormGroup>
      );
    });
  };

  return <>{inputResult(errors, properties)}</>;
};
