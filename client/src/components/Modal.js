import React from 'react';
import { Modal as ModalBS } from 'react-bootstrap';

export const Modal = props => {
  return (
    <ModalBS show={props.show} backdrop="static" animation={false}>
      <ModalBS.Header>
        <ModalBS.Title>{props.title}</ModalBS.Title>
      </ModalBS.Header>
      <ModalBS.Body>{props.body}</ModalBS.Body>
    </ModalBS>
  );
};
