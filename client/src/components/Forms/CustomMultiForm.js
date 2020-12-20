import React from 'react';
import { Form, Button } from 'react-bootstrap';

import CustomFileInputs from './../Inputs/CustomFileInputs';
import FormCustomInputs from './../Inputs/FormCustomInputs';

import {
  fieldInputProperties,
  fieldInputErrors
} from './../../utils/fieldPropHandler';

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
    inputTypeList,
    apiError,
    step
  } = props;

  const inputProperties = inputPropList.map(prop1 => {
    return prop1.map(prop2 => {
      return fieldInputProperties(
        {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          apiError
        },
        {
          ...prop2
        }
      );
    });
  });

  const inputErrors = inputErrList.map(prop1 => {
    return prop1.map(prop2 => {
      return fieldInputErrors(prop2.name, touched, errors);
    });
  });

  const inputTypes = inputTypeList.map((prop1, key1) => {
    return prop1.map((prop2, key2) => {
      switch (prop2) {
        case 'input':
          return (
            <FormCustomInputs
              properties={inputProperties[key1]}
              errors={inputErrors[key1]}
            />
          );
        case 'file':
          return (
            <CustomFileInputs
              properties={inputProperties[key1]}
              errors={inputErrors[key1]}
            />
          );
        default:
          return (
            <FormCustomInputs
              properties={inputProperties[key1]}
              errors={inputErrors[key1]}
            />
          );
      }
    });
  });

  console.log('inputProperies: ', inputProperties);
  console.log('inputErrors', inputErrors);
  console.log('inputTypes: ', inputTypes[0]);

  return <Form noValidate>{inputTypes[0]}</Form>;
};
