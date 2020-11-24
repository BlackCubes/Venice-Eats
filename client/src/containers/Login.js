import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { login } from './../services/authentication';
import { Alert } from './../components/Alert';
import './Login.css';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Must provide a valid email')
    .required('Required'),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characteers long')
    .max(60, 'Must be at least 60 characters or less')
    .matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/)
    .required('Required')
});

const Login = () => {
  return (
    <div className="Login">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(data, null, 2));
            resetForm();
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoFocus
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Button block size="lg" type="submit">
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
