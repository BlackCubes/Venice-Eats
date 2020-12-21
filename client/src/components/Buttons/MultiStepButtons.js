import React from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

export default props => {
  const { multiStepAmount, nextStep, prevStep, isSubmitting, step } = props;

  // const multiStepErrors = multiStepAmount.map(val1 => {
  //   return val1.map(val2 => {
  //     if (val2.props.errors[0] !== null) return val2.props.errors[0].props.type;
  //   });
  // });

  const multiStepErrors = multiStepAmount => {
    let multiErrors = [];
    multiStepAmount.forEach((val, key) => (multiErrors[key] = []));
    multiStepAmount.forEach((val1, key1) => {
      val1.forEach((val2, key2) => {
        if (val2.props.errors[0] !== null)
          multiErrors[key1][key2] = val2.props.errors[0].props.type;
      });
    });
    return multiErrors;
  };

  console.log('multiStepAmount: ', multiStepAmount);

  const multiStepBtnArray = multiStepAmount.map((val, key) => {
    if (key === 0) {
      return (
        <>
          <ButtonToolbar className="float-right">
            <ButtonGroup>
              <Button
                onClick={nextStep}
                disabled={
                  isSubmitting ||
                  multiStepErrors(multiStepAmount)[key].length > 0
                }
              >
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
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  multiStepErrors(multiStepAmount)[key].length > 0
                }
              >
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
              <Button
                onClick={nextStep}
                disabled={
                  isSubmitting ||
                  multiStepErrors(multiStepAmount)[key].length > 0
                }
              >
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
