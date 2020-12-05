import React from 'react';
import { Formik } from 'formik';

export default (initialValues, validationSchema, onSubmit, Component) => ({
  field,
  form,
  fieldProps
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      children={props => (
        <Component
          {...props}
          setFieldValue={form.setFieldValue}
          setFieldError={form.setFieldError}
          setErrors={form.setErrors}
          name={field.name}
          fieldProps={fieldProps}
        />
      )}
    />
  );
};
