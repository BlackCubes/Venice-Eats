import React from 'react';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';

export default props => {
  const {
    thValues,
    trValues,
    handleDelete,
    viewPath,
    loadingApi,
    apiDatas
  } = props;

  const thOutput = thValues => {
    return thValues.map((prop, key) => {
      return <th key={key}>{prop}</th>;
    });
  };

  const trOutput = (trValues, apiDatas, handleDelete, viewPath, loadingApi) => {
    return apiDatas.map((prop1, key1) => {
      return (
        <tr key={key1}>
          {trValues.map((prop2, key2) => {
            if (prop2 === 'cloudinaryPhoto')
              return (
                <td key={key2}>
                  <img
                    src={prop1[prop2].cloudinaryUrl}
                    alt={prop1['name'] + ' Photo'}
                    style={{ width: '300px' }}
                  />
                </td>
              );
            return <td key={key2}>{prop1[prop2]}</td>;
          })}
          <td>
            <Button
              variant="danger"
              size="sm"
              disabled={loadingApi}
              onClick={() => handleDelete(prop1._id)}
            >
              {loadingApi ? (
                <Spinner as="span" animation="grow" size="sm" role="status" />
              ) : (
                'DEL'
              )}
            </Button>
          </td>
          <td>
            <Button
              variant="outline-info"
              href={`/admin/${viewPath}/${prop1._id}`}
              type="button"
            >
              &raquo;
            </Button>
          </td>
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
                trOutput(trValues, apiDatas, handleDelete, viewPath, loadingApi)
              ) : (
                <tr>
                  <td>...</td>
                  <td>...</td>
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
