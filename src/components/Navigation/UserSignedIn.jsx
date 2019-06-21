import React from 'react';
import PropTypes from 'prop-types';

import SignOut from '../SignOut';
import { StyledButton } from '../../styled-components';

const UserSignedIn = ({ variant, redirectToDashboard }) => (
  <React.Fragment>
    <StyledButton variant={variant} onClick={redirectToDashboard}>
      Dashboard
    </StyledButton>
    <SignOut variant={variant} />
  </React.Fragment>
);

UserSignedIn.propTypes = {
  variant: PropTypes.string.isRequired,
  redirectToDashboard: PropTypes.func.isRequired,
};

export default UserSignedIn;
