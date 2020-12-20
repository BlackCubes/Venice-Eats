import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button, Alert, Row } from 'react-bootstrap';

import { postOne } from './../../actions/handlerFactory';

import CustomForm from './../Forms/CustomForm';

const PostFoodtruckModal = ({ apiError, postOne }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState(null);

  const handleToggle = () => setOpenModal(!openModal);

  const initialValues = {
    name: '',
    info: '',
    contact: {
      phoneNumber: '',
      email: '',
      website: '',
      social: {
        url1: '',
        url2: '',
        url3: ''
      }
    }
  };

  const validationSchema = '';

  const onSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    postOne('foodtrucks', data);
  };

  React.useEffect(() => {
    if (apiError) setApiErrorMsg(apiError);
    else setApiErrorMsg(null);
  }, [apiError]);

  const inputPropList = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Foodtruck Name',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'info',
      placeholder: 'Foodtruck Info',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.phoneNumber',
      placeholder: 'Phone Number',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.email',
      placeholder: 'Email',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.website',
      placeholder: 'Website',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.social.url1',
      placeholder: 'Url 1',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.social.url2',
      placeholder: 'Url 2',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.social.url3',
      placeholder: 'Url 3',
      apiError: apiErrorMsg
    }
  ];

  const inputErrList = [
    { name: 'name' },
    { name: 'info' },
    { name: 'contact.phoneNumber' },
    { name: 'contact.email' },
    { name: 'contact.website' },
    { name: 'contact.social.url1' },
    { name: 'contact.social.url2' },
    { name: 'contact.social.url3' }
  ];

  const FoodtruckPostForm = withFormik({
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
          Add Foodtruck
        </Button>
      </Row>

      <Modal show={openModal} animation={false} onHide={handleToggle}>
        <Modal.Header onHide={handleToggle}>
          <Modal.Title>Add a Foodtruck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {apiErrorMsg ? <Alert variant="danger">{apiErrorMsg}</Alert> : null}

          <FoodtruckPostForm
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
)(PostFoodtruckModal);
