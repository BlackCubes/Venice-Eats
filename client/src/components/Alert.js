import { Alert as AlertBS } from 'react-bootstrap/Alert';

export const Alert = message => {
  <AlertBS variant="danger">
    <AlertBS.Heading>Oh no! 😱 You got errors! 🙅‍♀️</AlertBS.Heading>
    <p>{message}</p>
  </AlertBS>;
};
