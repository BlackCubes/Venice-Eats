import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

import { getUser } from './../actions/user';

const AdminUserPage = ({ getUser, apiData, apiError, loadingUserApi }) => {
  React.useEffect(() => {
    const { params } = useParams();
    getUser(params);
  }, [getUser]);

  return (
    <div>
      <pre>
        Data: {apiData || !loadingUserApi ? JSON.stringify(apiData) : 'none'}
      </pre>
      <pre>Error: {apiError ? apiError : 'none'}</pre>
    </div>
  );
};

export default connect(
  state => ({
    apiData: state.apiUser.data,
    apiError: state.apiUser.error,
    loadingUserApi: state.apiUser.isLoading
  }),
  { getUser }
)(AdminUserPage);
