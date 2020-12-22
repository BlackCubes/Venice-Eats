import React from 'react';
import { FormGroup, FormFile } from 'react-bootstrap';

export default props => {
  const { errors, properties, previewSource } = props;

  const fileInputResult = (errors, properties) => {
    return properties.map((prop, key) => {
      return (
        <FormGroup key={key} size="lg">
          <FormFile custom={prop.custom}>
            <FormFile.Input
              name={prop.name}
              isInvalid={prop.isInvalid}
              onBlur={prop.onBlur}
              onChange={prop.onChange}
              required={prop.required}
            />
            <FormFile.Label>{prop.label}</FormFile.Label>
            {errors[key]}
          </FormFile>
          {previewSource && (
            <img
              src={previewSource}
              alt="Selected Upload"
              style={{ width: '400px' }}
            />
          )}
        </FormGroup>
      );
    });
  };

  return <>{fileInputResult(errors, properties)}</>;
};
