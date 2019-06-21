import React from 'react';
import PropTypes from 'prop-types';

import SignOut from '../SignOut';
import { ThemedButton } from '../../styled-components';

const UserSignedIn = ({ dashboard, variant, redirectToDashboard }) => (
  <React.Fragment>
    {!dashboard && (
      <ThemedButton variant={variant} onClick={redirectToDashboard}>
        Dashboard
      </ThemedButton>
    )}
    <SignOut variant={variant} />
  </React.Fragment>
);

UserSignedIn.propTypes = {
  dashboard: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  redirectToDashboard: PropTypes.func.isRequired,
};

export default UserSignedIn;
