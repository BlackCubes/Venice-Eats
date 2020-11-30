import React from 'react';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';

export default props => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Table striped hover>
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};
