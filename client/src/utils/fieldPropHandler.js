import React from 'react';
import { getIn } from 'formik';
import FormControl from 'react-bootstrap/FormControl';

export const fieldInputProperties = (propChanges, propStatic) => {
  return {
    defaultValue: getIn(propChanges.values, propStatic.name),
    className:
      getIn(propChanges.touched, propStatic.name) &&
      getIn(propChanges.errors, propStatic.name)
        ? 'error'
        : null,
    onChange: propChanges.handleChange,
    onBlur: propChanges.handleBlur,
    isInvalid:
      !!getIn(propChanges.errors, propStatic.name) || !!propChanges.apiError,
    ...propStatic
  };
};

export const FieldFileInputProperties = (propChanges, propStatic) => {
  const [fileName, setFileName] = React.useState('');
  const [previewSource, setPreviewSource] = React.useState('');

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    console.log(file);
    previewFile(file);
    propChanges.values[propStatic.name] = file.name;
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  return {
    properties: {
      // defaultValue: getIn(propChanges.values, propStatic.name),
      className:
        getIn(propChanges.touched, propStatic.name) &&
        getIn(propChanges.errors, propStatic.name)
          ? 'error'
          : null,
      // onChange: propChanges.handleChange,
      onChange: handleFileInputChange,
      onBlur: propChanges.handleBlur,
      isInvalid:
        !!getIn(propChanges.errors, propStatic.name) || !!propChanges.apiError,
      ...propStatic
    },
    previewSource
  };
};

export const fieldInputErrors = (name, touched, errors) => {
  return getIn(touched, name) && getIn(errors, name) ? (
    <FormControl.Feedback type="invalid">
      {getIn(errors, name)}
    </FormControl.Feedback>
  ) : null;
};
