import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Button, Alert, Row } from 'react-bootstrap';

import { postOne } from './../../actions/handlerFactory';

import CustomMultiForm from './../Forms/CustomMultiForm';

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
    }),
    foodtruckPhoto: foodtruckValidator.foodtruckPhoto.required()
  });

  const onSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    const regexPhoto = /^\b(jpg|jpeg|png)\b$/;
    const fileExt = data.foodtruckPhoto.type
      .split('/')
      .pop()
      .toLowerCase();
    if (!regexPhoto.test(fileExt))
      return setApiErrorMsg('Photo upload must be either jpg, jpeg, or png.');
    if (data.foodtruckPhoto.size > 1024000)
      return setApiErrorMsg('Max photo upload size is 1MB only.');

    console.log('Success!');
    // postOne('foodtrucks', data);
  };

  React.useEffect(() => {
    if (apiError) setApiErrorMsg(apiError);
    else setApiErrorMsg(null);
  }, [apiError]);

  React.useEffect(() => {
    if (apiErrorMsg)
      setTimeout(() => {
        setApiErrorMsg(null);
      }, 5000);
  }, [apiErrorMsg]);

  const inputPropList = [
    [
      {
        type: 'text',
        name: 'name',
        placeholder: 'Foodtruck Name*',
        required: true
      },
      {
        name: 'info',
        placeholder: 'Foodtruck Info (optional)',
        as: 'textarea',
        rows: 8,
        required: false
      }
    ],
    [
      {
        name: 'foodtruckPhoto',
        label: 'Upload Photo*',
        required: true
      }
    ],
    [
      {
        type: 'text',
        name: 'contact.phoneNumber',
        placeholder: 'Phone Number (optional)',
        required: false
      },
      {
        type: 'text',
        name: 'contact.email',
        placeholder: 'Email (optional)',
        required: false
      },
      {
        type: 'text',
        name: 'contact.website',
        placeholder: 'Website (optional)',
        required: false
      },
      {
        type: 'text',
        name: 'contact.social.url1',
        placeholder: 'Url 1 (optional)',
        required: false
      },
      {
        type: 'text',
        name: 'contact.social.url2',
        placeholder: 'Url 2 (optional)',
        required: false
      },
      {
        type: 'text',
        name: 'contact.social.url3',
        placeholder: 'Url 3 (optional)',
        required: false
      }
    ]
  ];

  const inputErrList = [
    [{ name: 'name' }, { name: 'info' }],
    [{ name: 'foodtruckPhoto' }],
    [
      { name: 'contact.phoneNumber' },
      { name: 'contact.email' },
      { name: 'contact.website' },
      { name: 'contact.social.url1' },
      { name: 'contact.social.url2' },
      { name: 'contact.social.url3' }
    ]
  ];

  const inputTypeList = [
    ['input', 'input'],
    ['file'],
    ['input', 'input', 'input', 'input', 'input', 'input']
  ];

  const FoodtruckPostForm = withFormik({
    mapPropsToValues(props) {
      return initialValues;
    },
    validationSchema: validationSchema,
    handleSubmit: onSubmit
  })(CustomMultiForm);

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
            inputTypeList={inputTypeList}
            apiError={apiErrorMsg}
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
