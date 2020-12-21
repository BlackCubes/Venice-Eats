import React from 'react';
import { Form } from 'react-bootstrap';

import CustomFileInputs from './../Inputs/CustomFileInputs';
import FormCustomInputs from './../Inputs/FormCustomInputs';
import MultiStepButtons from './../Buttons/MultiStepButtons';

import {
  fieldFileInputProperties,
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
    apiError
  } = props;

  const [step, setStep] = React.useState(0);

  const nextStep = () => setStep(step => step + 1);
  const prevStep = () => setStep(step => step - 1);

  const inputProperties = inputPropList.map((prop1, key1) => {
    return prop1.map((prop2, key2) => {
      switch (inputTypeList[key1][key2]) {
        case 'input':
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
        case 'file':
          return fieldFileInputProperties(
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
        default:
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
      }
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
              key={key2}
              properties={[inputProperties[key1][key2]]}
              errors={[inputErrors[key1][key2]]}
            />
          );
        case 'file':
          return (
            <CustomFileInputs
              key={key2}
              properties={[inputProperties[key1][key2]]}
              errors={[inputErrors[key1][key2]]}
            />
          );
        default:
          return (
            <FormCustomInputs
              key={key2}
              properties={[inputProperties[key1][key2]]}
              errors={[inputErrors[key1][key2]]}
            />
          );
      }
    });
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {inputTypes[step]}

      <MultiStepButtons
        multiStepAmount={inputTypes}
        nextStep={nextStep}
        prevStep={prevStep}
        isSubmitting={isSubmitting}
        step={step}
      />
    </Form>
  );
};
