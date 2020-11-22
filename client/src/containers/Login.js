import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from './../services/authentication';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleLoginForm = this.handleLoginForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleLoginForm(e) {
    e.preventDefault();

    const res = await login({
      email: this.state.email,
      password: this.state.password
    });

    console.log(`Response for logging in: ${res}`);
  }

  handleChange(e) {
    this.setState(e);
  }

  render() {
    return (
      <Form onSubmit={handleLoginForm}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={this.state.email}
            onChange={e => this.handleChange({ email: e.target.value })}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={this.state.password}
            onChange={e => this.handleChange({ password: e.target.password })}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}
