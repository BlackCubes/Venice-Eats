import React from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

export default props => {
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
