import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';

const WritePage = ({ user, firebase, match }) => {
  const [writing, setWriting] = React.useState('Write here...');

  React.useEffect(() => {
    async function fetchAll() {
      if (user) {
        const data = await firebase.getWriting(user, match.params.id);
        setWriting(data);
      }
    }

    fetchAll();
  }, [user, firebase, match]);

  return <div>{writing}</div>;
};

WritePage.propTypes = {
  user: PropTypes.string,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

WritePage.defaultProps = {
  user: '',
};

const condition = user => !!user;

export default compose(
  withFirebase,
  withAuthUser('uid'),
  withAuthorization(condition),
)(WritePage);
