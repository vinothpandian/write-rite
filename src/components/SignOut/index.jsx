import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { LANDING } from '../../constants/routes';

const SignOut = ({ firebase, history }) => {
  const handleSignOut = () => {
    firebase.signOutUser();
    history.push(LANDING);
  };

  return (
    <button type="button" onClick={handleSignOut}>
      Sign out
    </button>
  );
};

SignOut.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withRouter,
  withFirebase,
)(SignOut);
