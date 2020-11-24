import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import { Test } from './containers/Test';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
