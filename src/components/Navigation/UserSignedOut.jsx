import React from 'react';
import PropTypes from 'prop-types';
import TextButton from '../TextButton';

const UserSignedOut = ({ variant, showSignIn, showSignUp }) => (
  <React.Fragment>
    <TextButton placement="navbar" variant={variant} onClick={showSignIn}>
      Sign in
    </TextButton>
    <TextButton placement="navbar" variant={variant} onClick={showSignUp}>
      Sign up
    </TextButton>
  </React.Fragment>
);

UserSignedOut.propTypes = {
  variant: PropTypes.string.isRequired,
  showSignIn: PropTypes.func.isRequired,
  showSignUp: PropTypes.func.isRequired,
};

export default UserSignedOut;
