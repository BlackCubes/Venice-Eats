import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button, Alert, Row } from 'react-bootstrap';

import { postOne } from './../../actions/handlerFactory';

import CustomForm from './../Forms/CustomForm';

import { foodtruckValidator } from './../../utils/customValidation';

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
    },
    foodtruckPhoto: ''
  };

  const validationSchema = yup.object({
    name: foodtruckValidator.name.required('Required'),
    info: foodtruckValidator.info,
    contact: yup.object().shape({
      phoneNumber: foodtruckValidator.phoneNumber,
      email: foodtruckValidator.email,
      website: foodtruckValidator.url,
      social: yup.object().shape({
        url1: foodtruckValidator.url,
        url2: foodtruckValidator.url,
        url3: foodtruckValidator.url
      })
    })
  });

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
      placeholder: 'Foodtruck Name*',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'info',
      placeholder: 'Foodtruck Info (optional)',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.phoneNumber',
      placeholder: 'Phone Number (optional)',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.email',
      placeholder: 'Email (optional)',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.website',
      placeholder: 'Website (optional)',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.social.url1',
      placeholder: 'Url 1 (optional)',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.social.url2',
      placeholder: 'Url 2 (optional)',
      apiError: apiErrorMsg
    },
    {
      type: 'text',
      name: 'contact.social.url3',
      placeholder: 'Url 3 (optional)',
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