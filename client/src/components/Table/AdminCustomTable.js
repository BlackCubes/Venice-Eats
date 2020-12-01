import React from 'react';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';

export default props => {
  const { thValues, trValues, loadingApi, apiDatas } = props;

  const thOutput = thValues => {
    const th = [];
    for (var i = 0; i < thValues.length; i++) {
      th.push(<th key={i}>{thValues[i]}</th>);
    }
    return th;
  };

  const trOutput = (trValues, apiDatas) => {
    apiDatas.map((prop1, key1) => {
      return (
        <tr key={key1}>
          {trValues.map((prop2, key2) => {
            return <td key={key2}>{prop1[prop2]}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Table striped hover>
            <thead>
              <tr>{thOutput(thValues)}</tr>
            </thead>
            <tbody>{!loadingApi ? trOutput(trValues, apiDatas) : ''}</tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};
