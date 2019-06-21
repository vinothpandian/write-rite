import * as React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import Container from 'react-bootstrap/Container';

import { withAuthUser } from '../../contexts/Session';
import ThemeContext from '../../contexts/Theme';
import Navigation from '../../components/Navigation';
import { DASHBOARD } from '../../constants/routes';
import { ThemedJumbotron } from '../../styled-components';

const HomePage = ({ user, history }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const redirectToDashboard = () => {
    history.push(DASHBOARD);
  };

  return (
    <div>
      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        redirectToDashboard={redirectToDashboard}
        userSignedIn={!!user}
      />

      <ThemedJumbotron fluid>
        <Container>
          <h1>Write-Rite!</h1>
          <p>Simplest writer ever!</p>
        </Container>
      </ThemedJumbotron>
    </div>
  );
};

HomePage.propTypes = {
  // Disable eslint from checking prop-type of firebase user
  // eslint-disable-next-line
  user: PropTypes.any,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withRouter,
  withAuthUser(),
)(HomePage);
