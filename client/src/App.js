import React, { Component, useState } from 'react';
import axios from 'axios';
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const apiBaseUrl = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  responseType: 'json'
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  async componentDidMount() {
    try {
      const data = await apiBaseUrl.get('/testApi');

      this.setState({ apiResponse: data.apiTest });
    } catch (err) {
      console.log(`There was an error fetching the api: ${err.message}`);
    }
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

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: '' };
//   }

//   callApi() {
//     fetch('http://localhost:3001/testApi')
//       .then(res => res.json())
//       .then(data => this.setState({ apiResponse: data.apiTest }));
//   }

//   componentWillMount() {
//     this.callApi();
//   }

//   render() {
//     return (
//       <div className="App">
//         Hello! This is a test for Venice Eats!
//         <p>{this.state.apiResponse}</p>
//       </div>
//     );
//   }
// }
// export default App;
