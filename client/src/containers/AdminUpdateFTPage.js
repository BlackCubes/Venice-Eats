import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Alert, Button, Card } from 'react-bootstrap';

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

  let objExist = (obj, level, ...rest) => {
    if (obj === undefined) return false;
    if (!level) return Object.keys(obj).length > 0;
    if (rest.length === 0 && obj.hasOwnProperty(level)) return true;
    return objExist(obj[level], ...rest);
  };

  const initialValues = {
    name: objExist(apiSingleData, 'name') ? apiSingleData.name : '',
    info: objExist(apiSingleData, 'info') ? apiSingleData.info : '',
    contact: {
      phoneNumber: objExist(apiSingleData, 'contact', 'phoneNumber')
        ? apiSingleData.contact.phoneNumber
        : '',
      email: objExist(apiSingleData, 'contact', 'email')
        ? apiSingleData.contact.email
        : '',
      website: objExist(apiSingleData, 'contact', 'website')
        ? apiSingleData.contact.website
        : '',
      social: {
        url1: objExist(apiSingleData, 'contact', 'social', 'url1')
          ? apiSingleData.contact.social.url1
          : '',
        url2: objExist(apiSingleData, 'contact', 'social', 'url2')
          ? apiSingleData.contact.social.url2
          : '',
        url3: objExist(apiSingleData, 'contact', 'social', 'url3')
          ? apiSingleData.contact.social.url3
          : ''
      }
    },
    foodtruckPhoto: objExist(apiSingleData, 'cloudinaryPhoto')
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

      <Card className="text-center">
        <Card.Img
          src={
            objExist(apiSingleData, 'cloudinaryPhoto')
              ? apiSingleData.cloudinaryPhoto.cloudinaryUrl
              : null
          }
          alt={
            objExist(apiSingleData, 'name')
              ? apiSingleData.name + ' Photo'
              : 'No Photo'
          }
        />
        <Card.ImgOverlay>
          <Card.Title>Title</Card.Title>
          <Card.Text>Text</Card.Text>
        </Card.ImgOverlay>
        <Card.Footer className="text-muted">Footer</Card.Footer>
      </Card>

      <pre style={{ color: '#6495ED' }}>
        Initial Values: {JSON.stringify(initialValues, undefined, 4)}
      </pre>
      <pre style={{ color: '#FF7F50' }}>
        apiSingleData: {JSON.stringify(apiSingleData, undefined, 4)}
      </pre>
      <pre style={{ color: '#DE3163' }}>
        apiMenus: {JSON.stringify(apiMenus, undefined, 4)}
      </pre>
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
