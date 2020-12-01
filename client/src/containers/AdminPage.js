import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';

import { getAll, deleteOne } from './../actions/handlerFactory';

import AdminCustomTable from './../components/Table/AdminCustomTable';

const AdminPage = ({
  apiDatas,
  apiError,
  getAll,
  deleteOne,
  loadingUserApi
}) => {
  React.useEffect(() => {
    getAll('admins');
  }, [getAll]);

  const handleDelete = id => deleteOne('admin', id);

  return (
    <div>
      <Row>
        <Col md={12}>
          <AdminCustomTable
            thValues={['ID', 'Name', 'Email', 'Role']}
            trValues={['_id', 'name', 'email', 'role']}
            loadingApi={loadingUserApi}
            apiDatas={apiDatas}
          />
          {/* <Table striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Delete</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {!loadingUserApi ? (
                apiDatas.map(prop => (
                  <tr key={prop._id}>
                    <td>{prop._id}</td>
                    <td>{prop.name}</td>
                    <td>{prop.email}</td>
                    <td>{prop.role}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={loadingUserApi}
                        onClick={() => handleDelete(prop._id)}
                      >
                        {loadingUserApi ? (
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                          />
                        ) : (
                          'DEL'
                        )}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        href={`/admin/users/${prop._id}`}
                        type="button"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  </td>
                  <td>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  </td>
                  <td>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  </td>
                  <td>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  </td>
                  <td>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  </td>
                  <td>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </Table> */}
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => ({
    apiDatas: state.apiUser.datas,
    apiError: state.apiUser.error,
    loadingUserApi: state.apiUser.isLoading
  }),
  { getAll, deleteOne }
)(AdminPage);
