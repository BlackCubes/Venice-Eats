import React, { Component, useState } from 'react';
// import axios from 'axios';
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

    // try {
    //   const data = await apiBaseUrl.get('/testApi');
    //   return data;
    // } catch (err) {
    //   console.log(`There was an error fetching the api: ${err.message}`);
    // }
  };

  async componentDidMount() {
    this.callApi();
    // const { data } = await this.callApi();
    // this.setState({ apiResponse: data.apiTest });
  }

  render() {
    return (
      <div className="App">
        Hello! This is a new test for Venice Eats!
        <p>{this.state.apiResponse}</p>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

export default App;
