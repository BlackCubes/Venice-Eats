import React from 'react';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';

export default props => {
  const { thValues, trValues, loadingApi, apiDatas, extraContents } = props;

  const thOutput = thValues => {
    return thValues.map((prop, key) => {
      return <th key={key}>{prop}</th>;
    });
  };

  const trOutput = (trValues, apiDatas) => {
    return apiDatas.map((prop1, key1) => {
      return (
        <tr key={key1}>
          {trValues.map((prop2, key2) => {
            return <td key={key2}>{prop1[prop2]}</td>;
          })}
          {extraContents}
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
            <tbody>
              {!loadingApi ? (
                trOutput(trValues, apiDatas)
              ) : (
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};
