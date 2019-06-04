import * as React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { withTheme } from '../../contexts/Theme';
import SignOut from '../../components/SignOut';
import WritingList from '../../components/WritingsList';
import customProps from '../../proptypes';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';

const DashboardPage = ({
  firebase, theme, toggleTheme, user,
}) => {
  const addWriting = () => {
    const key = firebase.createWriting(user);
    console.log(key);
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
        <WritingList writings={['abc', 'efg', 'hij']} />
      </div>
    </div>
  );
};

DashboardPage.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  theme: customProps.theme.isRequired,
  toggleTheme: customProps.toggleTheme.isRequired,
  user: PropTypes.string,
};

DashboardPage.defaultProps = {
  user: '',
};

const condition = user => !!user;

export default compose(
  withTheme,
  withFirebase,
  withAuthUser('uid'),
  withAuthorization(condition),
)(DashboardPage);
