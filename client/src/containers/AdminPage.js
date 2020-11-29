import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Button } from 'react-bootstrap';

import { getUsers, deleteUser } from './../actions/user';

const AdminPage = ({
  apiData,
  apiError,
  getUsers,
  deleteUser,
  loadingUserApi,
  currentUser
}) => {
  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleDelete = id => deleteUser(id);

  const currentUserId = currentUser ? currentUser : '';

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
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {!loadingUserApi ? (
                apiData.map(prop => (
                  <tr key={prop._id}>
                    <td>{prop._id}</td>
                    <td>{prop.name}</td>
                    <td>{prop.email}</td>
                    <td>{prop.role}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={loadingUserApi || prop._id === currentUserId}
                        onClick={() => handleDelete(prop._id)}
                      >
                        {loadingUserApi ? '...' : 'DEL'}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
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
    </div>
  );
};

export default connect(
  state => ({
    apiData: state.apiUser.data,
    apiError: state.apiUser.error,
    loadingUserApi: state.apiUser.isLoading,
    currentUser: state.auth.user
  }),
  { getUsers, deleteUser }
)(AdminPage);
