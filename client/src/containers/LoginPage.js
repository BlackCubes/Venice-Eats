import React from 'react';
import { connect } from 'react-redux';
import { Formik, withFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

import { login } from './../actions/auth';

import withForm from './../components/HOC/withForm';
// import {
//   fieldInputProperties,
//   fieldInputErrors
// } from './../components/HOC/withField';

import { Alert } from './../components/Alert';
import CustomForm from './../components/Forms/CustomForm';
import FormCustomInputs from './../components/Inputs/FormCustomInputs';

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
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = yup.object({
    email: customValidation.email.required('Required'),
    password: customValidation.password.required('Required')
  });

  const onSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    login(data);
    resetForm();
  };

  // const inputProperties = [
  //   fieldInputProperties('email', 'email', 'Email', apiError),
  //   fieldInputProperties('password', 'password', 'Password', apiError)
  // ];

  // const inputErrors = [fieldInputErrors('email'), fieldInputErrors('password')];

  const LoginForm = withFormik({
    mapPropsToValues: () => initialValues,
    validationSchema: validationSchema,
    handleSubmit: onSubmit
  })(CustomForm);

  // const LoginForm = withForm(
  //   initialValues,
  //   validationSchema,
  //   onSubmit,
  //   CustomForm(inputProperties, inputErrors)
  // );

  return (
    <div className="Login">
      {apiError && (
        <Alert
          variant="danger"
          heading="Oh no! 😱 You got errors! 🙅‍♀️"
          message={apiError}
        />
      )}

      <LoginForm />

      {/* <LoginForm /> */}

      {/* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FormCustomInputs
              properties={[
                {
                  type: 'email',
                  name: 'email',
                  placeholder: 'Email',
                  value: values.email,
                  className: touched.email && errors.email ? 'error' : null,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  isInvalid: !!errors.email || !!apiError
                },
                {
                  type: 'password',
                  name: 'password',
                  placeholder: 'Password',
                  value: values.password,
                  className:
                    touched.password && errors.password ? 'error' : null,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  isInvalid: !!errors.password || !!apiError
                }
              ]}
              errors={[
                touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : null,
                touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : null
              ]}
            />
            <Button block size="lg" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik> */}
    </div>
  );
});
