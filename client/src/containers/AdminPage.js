import React from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
// import AdminNavbar from './../components/AdminNavComponent';

const AdminPage = () => {
  return (
    <div>
      {/* <AdminNavbar /> */}

      <h1>Welcome to the Admin Page!!!</h1>
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

export default AdminPage;
