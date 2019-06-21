import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { LANDING } from '../../constants/routes';
import { ThemedButton } from '../../styled-components';

const SignOut = ({ firebase, history, variant }) => {
  const handleSignOut = () => {
    firebase.signOutUser();
    history.push(LANDING);
  };

  return (
    <ThemedButton variant={variant} onClick={handleSignOut}>
      Sign out
    </ThemedButton>
  );
};

SignOut.defaultProps = {
  variant: 'outline-light',
};

SignOut.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  variant: PropTypes.string,
};

export default compose(
  withRouter,
  withFirebase,
)(SignOut);
