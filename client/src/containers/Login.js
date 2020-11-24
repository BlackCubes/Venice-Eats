import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { login } from './../services/authentication';
import { Alert } from './../components/Alert';
import './Login.css';

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
