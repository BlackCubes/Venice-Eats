import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import reducer from './reducer';

import { appMiddleware } from './middlewares/app';
import { apiMiddleware } from './middlewares/core';

import AdminPage from './containers/AdminPage';
import LoginPage from './containers/LoginPage';
import { Test } from './containers/Test';

import AdminNavbar from './components/AdminNavComponent';
import AuthRoute from './components/AuthRoute';

const createStoreWithMiddleware = applyMiddleware(
  appMiddleware,
  apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Test} />
          <AuthRoute path="/login" exact type="guest">
            <LoginPage />
          </AuthRoute>
          <AuthRoute path="/admin" exact type="private">
            <AdminNavbar />
            <AdminPage />
          </AuthRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
