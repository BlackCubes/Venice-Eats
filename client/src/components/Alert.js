import React from 'react';
import { Alert as AlertBS } from 'react-bootstrap/Alert';

export const Alert = props => {
  return (
    <AlertBS variant="danger">
      <AlertBS.Heading>Oh no! 😱 You got errors! 🙅‍♀️</AlertBS.Heading>
      <p>{props}</p>
    </AlertBS>
  );
};
