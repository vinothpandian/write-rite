import React from 'react';
import PropTypes from 'prop-types';
import { ThemedButton } from '../../styled-components';

const UserSignedOut = ({ variant, showSignIn, showSignUp }) => (
  <React.Fragment>
    <ThemedButton variant={variant} onClick={showSignIn}>
      Sign in
    </ThemedButton>
    <ThemedButton variant={variant} onClick={showSignUp}>
      Sign up
    </ThemedButton>
  </React.Fragment>
);

UserSignedOut.propTypes = {
  variant: PropTypes.string.isRequired,
  showSignIn: PropTypes.func.isRequired,
  showSignUp: PropTypes.func.isRequired,
};

export default UserSignedOut;
