import React from 'react';
import { Alert as AlertBS } from 'react-bootstrap';

export const Alert = props => {
  return (
    <AlertBS variant={props.variant}>
      <AlertBS.Heading>{props.heading}</AlertBS.Heading>
      <p>{props.message}</p>
    </AlertBS>
  );
};
