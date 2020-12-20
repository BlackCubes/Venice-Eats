import React from 'react';
import { FormGroup, FormFile } from 'react-bootstrap';

export default props => {
  const { errors, properties } = props;

  const fileInputResult = (errors, properties) => {
    return properties.map((prop, key) => {
      return (
        <FormGroup key={key} size="lg">
          <FormFile {...prop} />
          {errors[key]}
        </FormGroup>
      );
    });
  };

  return <>{fileInputResult(errors, properties)}</>;
};
