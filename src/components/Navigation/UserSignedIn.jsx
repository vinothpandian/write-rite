import React from 'react';
import PropTypes from 'prop-types';

import SignOut from '../SignOut';
import TextButton from '../TextButton';

const UserSignedIn = ({ dashboard, variant, redirectToDashboard }) => (
  <React.Fragment>
    {!dashboard && (
      <TextButton placement="navbar" variant={variant} onClick={redirectToDashboard}>
        Dashboard
      </TextButton>
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
