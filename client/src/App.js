import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  callApi() {
    fetch('http://localhost:3001/testApi')
      .then(res => res.json())
      .then(data => this.setState({ apiResponse: data.apiTest }));
  }

  componentWillMount() {
    this.callApi();
  }

  render() {
    return (
      <div className="App">
        Hello! This is a test for Venice Eats!
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}
export default App;
