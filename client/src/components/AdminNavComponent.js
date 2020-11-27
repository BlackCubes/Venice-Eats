import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../actions/auth';

import Nav from 'react-bootstrap';

const AdminNavbar = props => {
  return (
    <Nav>
      <Nav.Item>
        <Link to="/admin">Admin Page</Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onSelect={props.logout}>Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default connect({ logout })(AdminNavbar);
