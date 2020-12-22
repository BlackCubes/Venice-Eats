import * as yup from 'yup';

export const userValidator = {
  name: yup
    .string()
    .min(2, 'Must be at least 2 characters long')
    .max(70, 'Must be at least 70 characters or less'),
  email: yup.string().email('Must provide a valid email'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters long')
    .max(60, 'Must be at leaast 60 characters or less')
    .matches(
      /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/,
      'Must use at least one number, one special character, and one capital letter'
    ),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
};

export const foodtruckValidator = {
  name: yup
    .string()
    .min(6, 'Must be at least 6 characters long')
    .max(100, 'Must be at least 100 characters or less'),
  info: yup.string().max(1000, 'Must be 1000 characters or less'),
  phoneNumber: yup
    .string()
    .matches(
      /^[(]\d{3}[)]\s?\d{3}[-]\d{4}$/,
      'Must use a phone number in the form of (###)###-#### or (###) ###-####'
    ),
  email: yup.string().email('Must provide a valid email'),
  url: yup.string().url('Must provide a valid url'),
  foodtruckPhoto: yup.string()
};
