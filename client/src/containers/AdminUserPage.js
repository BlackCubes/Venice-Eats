import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

import { getOne, updateOne } from './../actions/handlerFactory';

import FormCustomInputs from './../components/Inputs/FormCustomInputs';

import customValidation from './../utils/customValidation';

const AdminUserPage = ({
  getOne,
  updateOne,
  apiSingleData,
  apiError,
  loadingUserApi
}) => {
  const { params } = useParams();

  React.useEffect(() => {
    getOne('admins', params);
  }, [getOne, params]);

  const initialValues = {
    name: apiSingleData ? apiSingleData.name : '',
    email: apiSingleData ? apiSingleData.email : ''
  };

  const validationSchema = yup.object({
    name: customValidation.name,
    email: customValidation.email
  });

  const onSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    updateOne('admins', params, data);
    resetForm();
  };

  return (
    <div>
      <Button variant="outline-info" href="/admin" type="button">
        &laquo;
      </Button>

      <div className="Login">
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
              {apiError ? <Alert variant="danger">{apiError}</Alert> : null}

              <FormCustomInputs
                properties={[
                  {
                    type: 'text',
                    name: 'name',
                    defaultValue: !loadingUserApi ? apiSingleData.name : '...',
                    placeholder: 'Name',
                    className: touched.name && errors.name ? 'error' : null,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    isInvalid: !!errors.name || !!apiError
                  },
                  {
                    type: 'email',
                    name: 'email',
                    defaultValue: !loadingUserApi ? apiSingleData.email : '...',
                    placeholder: 'Email',
                    className: touched.email && errors.email ? 'error' : null,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    isInvalid: !!errors.email || !!apiError
                  }
                ]}
                errors={[
                  touched.name && errors.name ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  ) : null,
                  touched.email && errors.email ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  ) : null
                ]}
              />

              <Button type="submit" disabled={isSubmitting}>
                {loadingUserApi ? (
                  <Spinner as="span" animation="grow" size="sm" role="status" />
                ) : (
                  'Update'
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    apiSingleData: state.apiUser.singleData,
    apiError: state.apiUser.error,
    loadingUserApi: state.apiUser.isLoading
  }),
  { getOne, updateOne }
)(AdminUserPage);
