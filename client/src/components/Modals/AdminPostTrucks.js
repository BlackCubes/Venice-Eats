import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Modal, Button, Alert, Row } from 'react-bootstrap';

import { postOne } from './../../actions/handlerFactory';

import FormCustomInputs from './../Inputs/FormCustomInputs';

import customValidation from './../../utils/customValidation';

const PostFoodTrucksModal = ({ apiError, postOne }) => {};

export default connect(
  state => ({
    apiError: state.apiFoodTrucks.error
  }),
  { postOne }
)(PostFoodTrucksModal);
