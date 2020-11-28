import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../actions/auth';

import Nav from 'react-bootstrap/Nav';

const AdminNavbar = props => {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link to="/admin" exact as={NavLink}>
          Admin Page
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={props.logout} href="#">
          Logout
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default connect(({ isAuthUser }) => ({ isAuthUser }), { logout })(
  AdminNavbar
);
