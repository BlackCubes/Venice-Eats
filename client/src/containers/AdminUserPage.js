import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

import { getUser, updateUser } from './../actions/user';

const AdminUserPage = ({
  getUser,
  updateUser,
  apiData,
  apiError,
  loadingUserApi
}) => {
  const { params } = useParams();

  React.useEffect(() => {
    getUser(params);
  }, [getUser]);

  const initialValues = {
    name: '',
    email: ''
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, 'Must be at least 2 characters long')
      .max(70, 'Must be at least 70 characters or less'),
    email: yup.string().email('Must provide a valid email')
  });

  const onSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    updateUser(data);
    resetForm();
  };

  return (
    <div>
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
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                defaultValue={!loadingUserApi ? apiData.name : ''}
                placeholder="Name"
                className={touched.name && errors.name ? 'error' : null}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.name || !!apiError}
              />
              {touched.name && errors.name ? (
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                name="email"
                defaultValue={!loadingUserApi ? apiData.email : ''}
                placeholder="Email"
                className={touched.email && errors.email ? 'error' : null}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email || !!apiError}
              />
              {touched.email && errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(
  state => ({
    apiData: state.apiUser.data,
    apiError: state.apiUser.error,
    loadingUserApi: state.apiUser.isLoading
  }),
  { getUser, updateUser }
)(AdminUserPage);
