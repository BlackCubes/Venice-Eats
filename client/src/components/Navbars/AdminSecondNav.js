import React from 'react';
import Nav from 'react-bootstrap/Nav';

export default () => {
  return (
    <Nav variant="tabs" defaultActiveKey="/admin">
      <Nav.Item>
        <Nav.Link href="/admin/users">Users</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/foodtrucks">Foodtrucks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#events">Events</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
