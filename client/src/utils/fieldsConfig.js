import React from 'react';
import FormControl from 'react-bootstrap';

export default apiError => ({ touched, errors, handleChange, handleBlur }) => {
  return {
    nameProperty: {
      type: 'text',
      name: 'name',
      placeholder: 'Name',
      className: touched.name && errors.name ? 'error' : null,
      onChange: handleChange,
      onBlur: handleBlur,
      isInvalid: !!errors.name || !!apiError
    },
    emailProperty: {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      className: touched.email && errors.email ? 'error' : null,
      onChange: handleChange,
      onBlur: handleBlur,
      isInvalid: !!errors.email || !!apiError
    },
    passwordProperty: {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      className: touched.password && errors.password ? 'error' : null,
      onChange: handleChange,
      onBlur: handleBlur,
      isInvalid: !!errors.password || !!apiError
    },
    passwordConfirmProperty: {
      type: 'password',
      name: 'password_confirmation',
      placeholder: 'Confirm Password',
      className:
        touched.password_confirmation && errors.password_confirmation
          ? 'error'
          : null,
      onChange: handleChange,
      onBlur: handleBlur,
      isInvalid: !!errors.password_confirmation || !!apiError
    },
    nameErrors:
      touched.name && errors.name ? (
        <FormControl.Feedback type="invalid">
          {errors.name}
        </FormControl.Feedback>
      ) : null,
    emailErrors:
      touched.email && errors.email ? (
        <FormControl.Feedback type="invalid">
          {errors.email}
        </FormControl.Feedback>
      ) : null,
    passwordErrors:
      touched.password && errors.password ? (
        <FormControl.Feedback type="invalid">
          {errors.password}
        </FormControl.Feedback>
      ) : null,
    passwordConfirmErrors:
      touched.password_confirmation && errors.password_confirmation ? (
        <FormControl.Feedback type="invalid">
          {errors.password_confirmation}
        </FormControl.Feedback>
      ) : null
  };
};
