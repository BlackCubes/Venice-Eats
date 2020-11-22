import React, { Component, useState } from 'react';
import * as api from './api.js';
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '', error: 'There are no errors.' };
  }

  callApi = async () => {
    const testApi = await api.getTest();

    if (testApi.error) this.setState({ error: testApi.error });
    else this.setState({ apiResponse: testApi.data });
  };

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <div className="App">
        Hello! This is a new test for Venice Eats!
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
