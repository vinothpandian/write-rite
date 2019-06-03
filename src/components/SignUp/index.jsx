import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Field, Formik } from 'formik';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { validateField as validate, validateEmail } from '../../utils';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { DASHBOARD } from '../../constants/routes';

const SignUp = (props) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <Formik
      initialValues={{ email: '', password: '', repeatPassword: '' }}
      onSubmit={(values, { resetForm }) => {
        const { firebase, history } = props;

        firebase
          .createUser(values)
          .then(() => {
            resetForm();
            history.push(DASHBOARD);
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      }}
      render={(formikProps) => {
        const { touched, errors, handleSubmit } = formikProps;

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
              <span>Repeat password</span>
              <Field type="password" validate={validate} name="repeatPassword" />
              {touched.repeatPassword && errors.repeatPassword && (
                <div>{errors.repeatPassword}</div>
              )}
            </div>

            <div>{errorMessage}</div>
            <div>
              <button type="submit">Sign up</button>
            </div>
          </form>
        );
      }}
    />
  );
};

SignUp.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withRouter,
  withFirebase,
)(SignUp);
