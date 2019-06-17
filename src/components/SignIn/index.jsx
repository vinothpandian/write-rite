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
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { DASHBOARD } from '../../constants/routes';

const schema = object({
  email: string()
    .email()
    .required(),
  password: string().required(),
});

const SignIn = props => (
  <Formik
    validationSchema={schema}
    initialValues={{ email: '', password: '' }}
    onSubmit={(values) => {
      const { firebase, history } = props;
      firebase.signInUser(values);
      history.push(DASHBOARD);
    }}
  >
    {({
      handleSubmit, handleChange, values, errors,
    }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationFormik02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Button type="submit">Sign in</Button>
      </Form>
    )}
  </Formik>
);

SignIn.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withRouter,
  withFirebase,
)(SignIn);
