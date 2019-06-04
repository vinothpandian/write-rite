import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import ContentEditable from 'react-contenteditable';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';

const WritePage = ({ user, firebase, match }) => {
  const [writing, setWriting] = React.useState('Write here...');

  const { id } = match.params;

  const contentEditable = React.createRef();

  const onKeyPress = (event) => {
    if (
      (window.navigator.platform.match('Mac') ? event.metaKey : event.ctrlKey)
      && event.keyCode === 83
    ) {
      event.preventDefault();

      firebase.saveWriting(user, id, writing);
    }
  };

  const handleChange = (event) => {
    setWriting(event.target.value);
  };

  React.useEffect(() => {
    async function fetchAll() {
      if (user) {
        const data = await firebase.getWriting(user, id);
        setWriting(data);
      }
    }

    fetchAll();
  }, [user, firebase, id]);

  return (
    <ContentEditable
      innerRef={contentEditable}
      html={writing}
      onChange={handleChange}
      onKeyDown={onKeyPress}
    />
  );
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
