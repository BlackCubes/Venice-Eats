import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button, Alert, Row } from 'react-bootstrap';

import { postOne } from './../../actions/handlerFactory';

import CustomForm from './../Forms/CustomForm';

import customValidation from './../../utils/customValidation';

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
    name: customValidation.name.required('Required'),
    email: customValidation.email.required('Required'),
    password: customValidation.password.required('Required'),
    password_confirmation: customValidation.password_confirmation.required(
      'Required'
    )
  });

  const onSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    postOne('admins', data);
  };

  React.useEffect(() => {
    if (apiError) setApiErrorMsg(apiError);
    else setApiErrorMsg(null);
  }, [apiError]);

  const inputPropList = [
    { type: 'text', name: 'name', placeholder: 'Name', apiError: apiErrorMsg },
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      apiError: apiErrorMsg
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      apiError: apiErrorMsg
    },
    {
      type: 'password',
      name: 'password_confirmation',
      placeholder: 'Confirm Password',
      apiError: apiErrorMsg
    }
  ];

  const inputErrList = [
    { name: 'name' },
    { name: 'email' },
    { name: 'password' },
    { name: 'password_confirmation' }
  ];

  const UserPostForm = withFormik({
    mapPropsToValues(props) {
      return initialValues;
    },
    validationSchema: validationSchema,
    handleSubmit: onSubmit
  })(CustomForm);

  return (
    <div>
      <Row>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add User
        </Button>
      </Row>

      <Modal show={openModal} animation={false} onHide={handleToggle}>
        <Modal.Header onHide={handleToggle}>
          <Modal.Title>Add a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {apiErrorMsg ? <Alert variant="danger">{apiErrorMsg}</Alert> : null}

          <UserPostForm
            inputPropList={inputPropList}
            inputErrList={inputErrList}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default connect(
  state => ({
    apiError: state.apiError.error
  }),
  { postOne }
)(PostUserModal);
