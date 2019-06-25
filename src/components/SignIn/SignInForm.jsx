import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Formik } from 'formik';
import { string, object } from 'yup';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import Firebase, { withFirebase } from '../../contexts/Firebase';
import { DASHBOARD } from '../../constants/routes';

const schema = object({
  email: string()
    .email()
    .required('Email is required'),
  password: string().required('Password is required'),
});

const SignInForm = (props) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        const { firebase, history } = props;
        firebase
          .signInUser(values)
          .then(() => {
            history.push(DASHBOARD);
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      }}
    >
      {({
        handleSubmit, handleChange, handleBlur, values, errors, touched,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} xs="8" controlId="validationFormik01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.email && !!touched.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Col xs="12" />
              <Form.Group as={Col} xs="8" controlId="validationFormik02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password && !!touched.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Sign in</Button>
            <Button variant="secondary" type="button" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

SignInForm.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withFirebase,
)(SignInForm);
