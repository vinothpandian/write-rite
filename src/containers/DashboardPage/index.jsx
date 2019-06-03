import * as React from 'react';
import { compose } from 'recompose';
import { withTheme } from '../../contexts/Theme';
import SignOut from '../../components/SignOut';
import customProps from '../../proptypes';
import { withAuthorization } from '../../contexts/Session';

const DashboardPage = ({ theme, toggleTheme }) => (
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
    </div>
  </div>
);

DashboardPage.propTypes = {
  theme: customProps.theme.isRequired,
  toggleTheme: customProps.toggleTheme.isRequired,
};

const condition = user => !!user;

export default compose(
  withTheme,
  withAuthorization(condition),
)(DashboardPage);
