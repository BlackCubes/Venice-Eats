import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';

import { getUsers } from './../actions/user';

const AdminPage = ({ apiData, apiError, getUsers, loadingUserApi }) => {
  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <Row>
        <Col md={12}>
          <Table striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {apiData ? (
                apiData.map(prop => (
                  <tr key={prop._id}>
                    <td>{prop._id}</td>
                    <td>{prop.name}</td>
                    <td>{prop.email}</td>
                    <td>{prop.role}</td>
                  </tr>
                ))
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
    </div>
  );
};

export default connect(
  state => ({
    apiData: state.apiUser.data,
    apiError: state.apiUser.error,
    loadingUserApi: state.apiUser.isLoading
  }),
  { getUsers }
)(AdminPage);
