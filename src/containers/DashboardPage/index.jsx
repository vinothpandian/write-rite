import * as React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { withTheme } from '../../contexts/Theme';
import SignOut from '../../components/SignOut';
import customProps from '../../proptypes';
import { withAuthorization } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';

const DashboardPage = ({ firebase, theme, toggleTheme }) => {
  const addWriting = () => {
    const key = firebase.createWriting();
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
    </div>
  );
};

DashboardPage.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  theme: customProps.theme.isRequired,
  toggleTheme: customProps.toggleTheme.isRequired,
};

const condition = user => !!user;

export default compose(
  withTheme,
  withFirebase,
  withAuthorization(condition),
)(DashboardPage);
