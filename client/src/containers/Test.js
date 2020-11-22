import React, { Component } from 'react';
import { getTest } from './../services/api';

export class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { res: '' };
  }

  callApi = async () => {
    const testApi = await getTest();

    if (testApi.error) this.setState({ res: testApi.error });
    else this.setState({ res: testApi.data });
  };

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <div className="App">
        Hello! This is just a test route for the home page!
        <p>{this.state.res}</p>
      </div>
    );
  }
}
