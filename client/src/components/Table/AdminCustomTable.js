import React from 'react';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';

export default props => {
  const { thValues, apiData, loadingApi } = props;

  const thOutput = thValues => {
    const th = [];
    for (var i = 0; i < thValues.length; i++) {
      th.push(<th key={i}>{thValues[i]}</th>);
    }
    return th;
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Table striped hover>
            <thead>
              <tr>{thOutput(thValues)}</tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};
