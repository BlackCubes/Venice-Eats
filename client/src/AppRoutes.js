import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Container } from 'react-bootstrap';

import reducer from './reducers/index';

import { appMiddleware } from './middlewares/app';
import { apiMiddleware } from './middlewares/core';

import AdminPage from './containers/AdminPage';
import AdminUserPage from './containers/AdminUserPage';
import LoginPage from './containers/LoginPage';
import { Test } from './containers/Test';

import AdminNavbar from './components/AdminNavComponent';
import AdminSecondNavbar from './components/AdminSecNavComponent';
import AuthRoute from './components/AuthRoute';
import PostUserModal from './components/Modal/AddUserModalAdminComponent';

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
            <Container fluid>
              <AdminSecondNavbar />
              <PostUserModal />
              <AdminPage />
            </Container>
          </AuthRoute>
          <AuthRoute path="/admin/users/:params" exact type="private">
            <AdminNavbar />
            <Container fluid>
              <AdminSecondNavbar />
              <AdminUserPage />
            </Container>
          </AuthRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
