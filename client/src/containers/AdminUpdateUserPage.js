import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Alert, Button } from 'react-bootstrap';

import { getOne, updateOne } from './../actions/handlerFactory';

import CustomForm from './../components/Forms/CustomForm';

import customValidation from './../utils/customValidation';

const AdminUpdateUserPage = ({
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

  const onSubmit = (data, { setSubmitting }) => {
    setSubmitting(true);
    updateOne('admins', params, data);
  };

  const inputPropList = [
    { type: 'text', name: 'name', placeholder: 'Name', apiError: apiError },
    { type: 'email', name: 'email', placeholder: 'Email', apiError: apiError }
  ];

  const inputErrList = [{ name: 'name' }, { name: 'email' }];

  const UserUpdateForm = withFormik({
    mapPropsToValues(props) {
      return initialValues;
    },
    validationSchema: validationSchema,
    handleSubmit: onSubmit
  })(CustomForm);

  return (
    <div>
      <Button variant="outline-info" href="/admin" type="button">
        &laquo;
      </Button>

      <div className="Login">
        {apiError && (
          <Alert
            variant="danger"
            heading="Oh no! 😱 You got errors! 🙅‍♀️"
            message={apiError}
          />
        )}

        <UserUpdateForm
          inputPropList={inputPropList}
          inputErrList={inputErrList}
        />

        {/* <Formik
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
        </Formik> */}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    apiSingleData: state.apiUser.singleData,
    apiError: state.apiError.error,
    loadingUserApi: state.apiUser.isLoading
  }),
  { getOne, updateOne }
)(AdminUpdateUserPage);
