import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from '../../styled-components';

const UserSignedOut = ({ variant, showSignIn, showSignUp }) => (
  <React.Fragment>
    <StyledButton variant={variant} onClick={showSignIn}>
      Sign in
    </StyledButton>
    <StyledButton variant={variant} onClick={showSignUp}>
      Sign up
    </StyledButton>
  </React.Fragment>
);

UserSignedOut.propTypes = {
  variant: PropTypes.string.isRequired,
  showSignIn: PropTypes.func.isRequired,
  showSignUp: PropTypes.func.isRequired,
};

export default UserSignedOut;
