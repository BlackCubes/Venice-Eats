import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  callApi() {
    fetch('http://localhost:3001/testApi')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
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
