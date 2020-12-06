import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { login } from './../actions/auth';

import { Alert } from './../components/Alert';
import CustomForm from './../components/Forms/CustomForm';

import customValidation from './../utils/customValidation';

import './Login.css';

export default connect(
  state => ({
    isLoading: state.auth.isLoading,
    apiError: state.apiError.error
  }),
  {
    login
  }
)(({ apiError, login }) => {
  const validationSchema = yup.object({
    email: customValidation.email.required('Required'),
    password: customValidation.password.required('Required')
  });

  const onSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    login(data);
    resetForm();
  };

  const inputPropList = [
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' }
  ];

  const inputErrList = [{ name: 'email' }, { name: 'password' }];

  const initialValues = {
    email: '',
    password: ''
  };

  const LoginForm = withFormik({
    mapPropsToValues(props) {
      return initialValues;
    },
    validationSchema: validationSchema,
    handleSubmit: onSubmit
  })(CustomForm);

  return (
    <div className="Login">
      {apiError && (
        <Alert
          variant="danger"
          heading="Oh no! 😱 You got errors! 🙅‍♀️"
          message={apiError}
        />
      )}

      <LoginForm inputPropList={inputPropList} inputErrList={inputErrList} />
    </div>
  );
});
