import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Modal, Button, Alert } from 'react-bootstrap';

import { postOne } from './../../actions/handlerFactory';

import FormCustomInputs from './../Inputs/FormCustomInputs';

const PostUserModal = ({ apiError, postOne }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState(null);

  const handleToggle = () => setOpenModal(!openModal);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, 'Must be at least 2 characters long')
      .max(70, 'Must be at least 70 characters or less')
      .required('Required'),
    email: yup
      .string()
      .email('Must provide a valid email')
      .required('Required'),
    password: yup
      .string()
      .min(8, 'Must be at least 8 characters long')
      .max(60, 'Must be at least 60 charactersor less')
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/,
        'Must use at least one number, one special character, and one capital letter'
      )
      .required('Required'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    postOne('admins', data);
    if (!apiError) {
      resetForm();
    }
  };

  React.useEffect(() => {
    if (apiError) setApiErrorMsg(apiError);
    else setApiErrorMsg(null);
  }, [apiError]);

  return (
    <div>
      <div className="admin-create-button" style={{ float: 'right' }}>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add User
        </Button>
      </div>

      <Modal show={openModal} animation={false} onHide={handleToggle}>
        <Modal.Header onHide={handleToggle}>
          <Modal.Title>Add a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {apiErrorMsg ? <Alert variant="danger">{apiErrorMsg}</Alert> : null}

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
                      type: 'text',
                      name: 'name',
                      placeholder: 'Name',
                      className: touched.name && errors.name ? 'error' : null,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      isInvalid: !!errors.name || !!apiError
                    },
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
                    },
                    {
                      type: 'password',
                      name: 'password_confirmation',
                      placeholder: 'Confirm Password',
                      classname:
                        touched.password_confirmation &&
                        errors.password_confirmation
                          ? 'error'
                          : null,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      isInvalid: !!errors.password_confirmation || !!apiError
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
                    ) : null,
                    touched.password && errors.password ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    ) : null,
                    touched.password_confirmation &&
                    errors.password_confirmation ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.password_confirmation}
                      </Form.Control.Feedback>
                    ) : null
                  ]}
                />

                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default connect(
  state => ({
    apiError: state.apiUser.error
  }),
  { postOne }
)(PostUserModal);
