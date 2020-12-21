import React from 'react';
import { Form, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

import CustomFileInputs from './../Inputs/CustomFileInputs';
import FormCustomInputs from './../Inputs/FormCustomInputs';

import {
  fieldInputProperties,
  fieldInputErrors
} from './../../utils/fieldPropHandler';

const MultiStepButton = props => {
  const { multiStepAmount, nextStep, prevStep, isSubmitting, step } = props;

  const multiStepBtnArray = multiStepAmount.map((val, key) => {
    if (key === 0) {
      return (
        <>
          <ButtonToolbar className="float-right">
            <ButtonGroup>
              <Button onClick={nextStep} disabled={isSubmitting}>
                Continue
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </>
      );
    } else if (key === multiStepAmount.length - 1) {
      return (
        <>
          <ButtonToolbar className="justify-content-between">
            <ButtonGroup>
              <Button onClick={prevStep} disabled={isSubmitting}>
                Previous
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </>
      );
    } else if (key > 0 && key < multiStepAmount.length - 1) {
      return (
        <>
          <ButtonToolbar className="justify-content-between">
            <ButtonGroup>
              <Button onClick={prevStep} disabled={isSubmitting}>
                Previous
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={nextStep} disabled={isSubmitting}>
                Next
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </>
      );
    } else {
      return <></>;
    }
  });

  return multiStepBtnArray[step];
};

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

      <MultiStepButton
        multiStepAmount={inputTypes}
        nextStep={nextStep}
        prevStep={prevStep}
        isSubmitting={isSubmitting}
        step={step}
      />
    </Form>
  );
};
