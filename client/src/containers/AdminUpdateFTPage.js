import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Alert, Button } from 'react-bootstrap';

import { getOne, updateOne } from './../actions/handlerFactory';

import CustomForm from './../components/Forms/CustomForm';

import { foodtruckValidator } from './../utils/customValidation';

const AdminUpdateFTPage = ({
  getOne,
  updateOne,
  apiSingleData,
  apiMenus,
  apiError,
  loadingFoodtruckApi
}) => {
  const { params } = useParams();

  React.useEffect(() => {
    getOne('foodtrucks', params);
  }, [getOne, params]);

  let objectExist = obj => Object.keys(obj).length > 0;

  const initialValues = {
    name: objectExist(apiSingleData) ? apiSingleData.name : '',
    info: objectExist(apiSingleData) ? apiSingleData.info : '',
    contact: {
      phoneNumber: objectExist(apiSingleData)
        ? apiSingleData.contact.phoneNumber
        : '',
      email: objectExist(apiSingleData) ? apiSingleData.contact.email : '',
      website: objectExist(apiSingleData) ? apiSingleData.contact.website : '',
      social: {
        url1: objectExist(apiSingleData)
          ? apiSingleData.contact.social.url1
          : '',
        url2: objectExist(apiSingleData)
          ? apiSingleData.contact.social.url2
          : '',
        url3: objectExist(apiSingleData)
          ? apiSingleData.contact.social.url3
          : ''
      }
    },
    foodtruckPhoto: objectExist(apiSingleData)
      ? apiSingleData.cloudinaryPhoto
      : ''
  };

  const validationSchema = yup.object({
    name: foodtruckValidator.name,
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
    foodtruckPhoto: foodtruckValidator.foodtruckPhoto
  });

  return (
    <div>
      <Button variant="outline-info" href="/admin/foodtrucks">
        &laquo;
      </Button>

      <pre>Initial Values: {JSON.stringify(initialValues)}</pre>
      <pre>apiSingleData: {JSON.stringify(apiSingleData)}</pre>
      <pre>apiMenus: {JSON.stringify(apiMenus)}</pre>
    </div>
  );
};

export default connect(
  state => ({
    apiSingleData: state.apiFoodtruck.singleData,
    apiMenus: state.apiFoodtruck.menus,
    apiError: state.apiError.error,
    loadingFoodtruckApi: state.apiFoodtruck.isLoading
  }),
  { getOne, updateOne }
)(AdminUpdateFTPage);
