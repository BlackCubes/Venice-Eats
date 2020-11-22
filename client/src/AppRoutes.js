import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Login } from './containers/Login';
import { Test } from './containers/Test';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" component={Test} /> */}
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
