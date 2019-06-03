import React from 'react';
import PropTypes from 'prop-types';

import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import Firebase, { withFirebase } from '../Firebase';
import { LANDING } from '../../constants/routes';

const withAuthorization = condition => (Component) => {
  const Authorization = (props) => {
    React.useEffect(() => {
      props.firebase.auth.onAuthStateChanged((user) => {
        if (!condition(user)) {
          props.history.push(LANDING);
        }
      });
    });

    return <Component {...props} />;
  };

  Authorization.propTypes = {
    firebase: PropTypes.instanceOf(Firebase).isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  };

  return compose(
    withFirebase,
    withRouter,
  )(Authorization);
};

export default withAuthorization;
