import * as React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { withTheme } from '../../contexts/Theme';
import SignOut from '../../components/SignOut';
import WritingList from '../../components/WritingsList';
import customProps from '../../proptypes';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';

const DashboardPage = ({
  firebase, theme, toggleTheme, user, history,
}) => {
  const [writings, setWritings] = React.useState({});

  React.useEffect(() => {
    async function fetchAll() {
      if (user) {
        const data = await firebase.getWritings(user);
        setWritings(data);
      }
    }

    fetchAll();
  }, [user, firebase]);

  const addWriting = () => {
    const key = firebase.addWriting(user);
    history.push(`write/${key}`);
  };

  return (
    <div
      className={theme.className}
      style={{
        background: theme.backgroundColor,
        color: theme.fontColor,
      }}
    >
      Dashboard
      <div>
        <SignOut />
        <button type="button" onClick={toggleTheme}>
          Toggle
        </button>
        <button type="button" onClick={addWriting}>
          Add Writing
        </button>
      </div>
      <div>
        <WritingList writings={writings} />
      </div>
    </div>
  );
};

DashboardPage.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  theme: customProps.theme.isRequired,
  toggleTheme: customProps.toggleTheme.isRequired,
  user: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
};

DashboardPage.defaultProps = {
  user: '',
};

const condition = user => !!user;

export default compose(
  withTheme,
  withFirebase,
  withRouter,
  withAuthUser('uid'),
  withAuthorization(condition),
)(DashboardPage);
