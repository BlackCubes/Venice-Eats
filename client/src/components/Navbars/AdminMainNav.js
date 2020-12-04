import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';

import Nav from 'react-bootstrap/Nav';

const AdminNavbar = ({ logout }) => {
  return (
    <Nav className="bg-dark">
      <Nav.Item>
        <Nav.Link className="text-white" to="/admin" exact as={NavLink}>
          Admin Page
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-white" onClick={logout} href="#">
          Logout
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default connect(state => ({ isAuthUser: state.auth.isAuthUser }), {
  logout
})(AdminNavbar);
