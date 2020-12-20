import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Container } from 'react-bootstrap';

import reducer from './reducers/index';

import { appMiddleware } from './middlewares/app';
import { apiMiddleware } from './middlewares/core';

import AdminPage from './containers/AdminPage';
import AdminViewUsersPage from './containers/AdminViewUsersPage';
import AdminUpdateUserPage from './containers/AdminUpdateUserPage';
import AdminViewFoodtrucksPage from './containers/AdminViewFoodtrucksPage';
import LoginPage from './containers/LoginPage';
import { Test } from './containers/Test';

import AdminNavbar from './components/Navbars/AdminMainNav';
import AdminSecondNavbar from './components/Navbars/AdminSecondNav';
import AuthRoute from './components/HOC/AuthRoute';
import PostUserModal from './components/Modals/AdminPostModal';

// const createStoreWithMiddleware = applyMiddleware(
//   appMiddleware,
//   apiMiddleware
// )(createStore);

// const store = createStoreWithMiddleware(reducer);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(appMiddleware, apiMiddleware))
);

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
              <AdminPage />
            </Container>
          </AuthRoute>
          <AuthRoute path="/admin/users" exact type="private">
            <AdminNavbar />
            <Container fluid>
              <AdminSecondNavbar />
              <PostUserModal />
              <AdminViewUsersPage />
            </Container>
          </AuthRoute>
          <AuthRoute path="/admin/users/:params" exact type="private">
            <AdminNavbar />
            <Container fluid>
              <AdminUpdateUserPage />
            </Container>
          </AuthRoute>
          <AuthRoute path="/admin/foodtrucks" exact type="private">
            <AdminNavbar />
            <Container fluid>
              <AdminSecondNavbar />
              <PostUserModal />
              <AdminViewFoodtrucksPage />
            </Container>
          </AuthRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
