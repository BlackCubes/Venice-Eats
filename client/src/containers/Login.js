import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { loginApi } from './../services/authentication';
import { Alert } from './../components/Alert';
import './Login.css';

const Login = () => {
  const [apiError, setApiError] = React.useState(null);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Must provide a valid email')
      .required('Required'),
    password: yup
      .string()
      .min(8, 'Must be at least 8 characteers long')
      .max(60, 'Must be at least 60 characters or less')
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/,
        'Must use at least one number, one special character, and one capital letter'
      )
      .required('Required')
  });

  const onSubmit = async (data, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const res = await loginApi(data);

    if (res.error) setApiError(res.error);
    else alert(JSON.stringify(data, null, 2));

    resetForm();
  };

  return (
    <div className="Login">
      {apiError && (
        <Alert
          variant="danger"
          heading="Oh no! 😱 You got errors! 🙅‍♀️"
          message={apiError}
        />
      )}

      <Formik
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
            <Form.Group size="lg" controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                className={touched.email && errors.email ? 'error' : null}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email}
              />
              {touched.email && errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className={touched.password && errors.password ? 'error' : null}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password}
              />
              {touched.password && errors.password ? (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Button block size="lg" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

// export class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { email: '', password: '', error: null };

//     this.handleLoginForm = this.handleLoginForm.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   async handleLoginForm(e) {
//     e.preventDefault();

//     const data = {
//       email: this.state.email,
//       password: this.state.password
//     };

//     const res = await login(data);

//     if (res.error) this.setState({ error: res.error });
//     else console.log(`Success! ${res.data}`);
//   }

//   handleChange(e) {
//     this.setState(e);
//   }

//   render() {
//     return (
//       <div className="Login">
//         {this.state.error && <Alert message={this.state.error} />}

//         <Form onSubmit={this.handleLoginForm}>
//           <Form.Group size="lg" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               autoFocus
//               type="email"
//               value={this.state.email}
//               onChange={e => this.handleChange({ email: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group size="lg" controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={this.state.password}
//               onChange={e => this.handleChange({ password: e.target.value })}
//             />
//           </Form.Group>
//           <Button block size="lg" type="submit">
//             Login
//           </Button>
//         </Form>
//       </div>
//     );
//   }
// }
