import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AdminPage from './containers/AdminPage';
import LoginPage from './containers/LoginPage';
import { Test } from './containers/Test';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/admin" exact component={AdminPage} />
      </Switch>
    </Router>
  );
};

export default App;
