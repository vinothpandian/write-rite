import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Field, Formik } from 'formik';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { validateField as validate, validateEmail } from '../../utils';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { DASHBOARD } from '../../constants/routes';
import Button from '../Button';

const SignIn = props => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values) => {
      const { firebase, history } = props;
      firebase.signInUser(values);
      history.push(DASHBOARD);
    }}
    render={(formikProps) => {
      const {
        touched, errors, dirty, isValid, handleSubmit,
      } = formikProps;

      const resetPassword = () => {
        console.log('Reset Password');
      };

      return (
        <form onSubmit={handleSubmit}>
          <div>
            <span>Email</span>
            <Field type="email" validate={validateEmail} name="email" />
            {touched.email && errors.email && <div>{errors.email}</div>}
          </div>

          <div>
            <span>Password</span>
            <Field type="password" validate={validate} name="password" />
            {touched.password && errors.password && <div>{errors.password}</div>}
          </div>

          <div>
            <Button
              type="button"
              color="red"
              disabled={typeof errors.email !== 'undefined' || !dirty}
              onClick={resetPassword}
            >
              Reset Password
            </Button>
          </div>

          <div>
            <Button color="blue" disabled={!isValid} type="submit">
              Sign in
            </Button>
          </div>
        </form>
      );
    }}
  />
);

SignIn.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withRouter,
  withFirebase,
)(SignIn);
