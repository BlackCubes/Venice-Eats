import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

import { login } from './../actions/auth';

import { Alert } from './../components/Alert';
import FormCustomInputs from './../components/Inputs/FormCustomInputs';

import './Login.css';

export default connect(
  state => ({ isLoading: state.auth.isLoading, apiError: state.auth.error }),
  {
    login
  }
)(({ apiError, login }) => {
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Must provide a valid email')
      .required('Required'),
    password: yup
      .string()
      .min(8, 'Must be at least 8 characteers long')
      .max(60, 'Must be at least 60 characters or less')
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/,
        'Must use at least one number, one special character, and one capital letter'
      )
      .required('Required')
  });

  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    login(data);
    resetForm();
  };

  return (
    <div className="Login">
      {apiError && (
        <Alert
          variant="danger"
          heading="Oh no! 😱 You got errors! 🙅‍♀️"
          message={apiError}
        />
      )}

      <Formik
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
                  className: touched.email && errors.email ? 'error' : null,
                  onChange: handleChange,
                  onBlur: handleBlur,
                  isInvalid: !!errors.email || !!apiError
                },
                {
                  type: 'password',
                  name: 'password',
                  placeholder: 'Password',
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
      </Formik>
    </div>
  );
});
