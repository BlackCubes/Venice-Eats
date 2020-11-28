import React from 'react';
import { connect } from 'react-redux';
import { Container, Table, Row, Col } from 'react-bootstrap';

import { getUsers } from './../actions/user';

const AdminPage = ({ apiData, apiError, getUsers }) => {
  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <h1>Welcome to the Admin Page!!!</h1>
      <pre>Your GET USERS list: {apiData ? apiDate : apiError}</pre>
      <Container fluid>
        <Row>
          <Col md={12}>
            <Table striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Elias Gutierrez Test</td>
                  <td>Admin Test</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(
  state => ({
    apiData: state.freeman.data,
    apiError: state.freeman.error
  }),
  { getUsers }
)(AdminPage);
