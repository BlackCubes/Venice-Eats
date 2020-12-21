import React from 'react';
import { FormGroup, FormFile } from 'react-bootstrap';

export default props => {
  const { errors, properties, previewSource } = props;

  const fileInputResult = (errors, properties) => {
    return properties.map((prop, key) => {
      return (
        <FormGroup key={key} size="lg">
          <FormFile {...prop} />
          {previewSource && (
            <img
              src={previewSource}
              alt="Selected Upload"
              style={{ width: '400px' }}
            />
          )}
          {errors[key]}
        </FormGroup>
      );
    });
  };

  return <>{fileInputResult(errors, properties)}</>;
};
