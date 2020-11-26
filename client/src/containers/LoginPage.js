import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

import { login } from './../actions/auth';
import { Alert } from './../components/Alert';
import { Modal } from './../components/Modal';

import './Login.css';

export default connect(null, { login })(props => {
  // const [apiError, setApiError] = React.useState(null);
  // const [apiData, setApiData] = React.useState(null);

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

    props.login(data);

    // const res = await props.loginApi(data);

    // if (res.error) {
    //   setApiError(res.error);
    // } else {
    //   setApiData(res.data.user.name.split(' ')[0]);
    // }

    resetForm();
  };

  return (
    <div className="Login">
      {props.error && (
        <Alert
          variant="danger"
          heading="Oh no! 😱 You got errors! 🙅‍♀️"
          message={props.error}
        />
      )}
      {!props.error && (
        <Modal size="sm" title={`Welcome back, ${props.user}!`} body="..." />
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
            <Form.Group size="lg" controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                className={touched.email && errors.email ? 'error' : null}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email || !!props.error}
              />
              {touched.email && errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className={touched.password && errors.password ? 'error' : null}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password || !!props.error}
              />
              {touched.password && errors.password ? (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Button block size="lg" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
