import React from 'react';
import PropTypes from 'prop-types';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import customProps from '../../proptypes';

import SignIn from '../SignIn';
import SignUp from '../SignUp';

import UserSignedIn from './UserSignedIn';
import UserSignedOut from './UserSignedOut';
import { ThemedHR } from '../../styled-components';
import IconButton from '../IconButton';
import { toggleFullScreen } from '../../utils';

const lightToggleIcon = require('../../assets/toggle-theme-light.svg');
const darkToggleIcon = require('../../assets/toggle-theme-dark.svg');

const lightFullscreenEnterIcon = require('../../assets/fullscreen-enter-light.svg');
const darkFullscreenEnterIcon = require('../../assets/fullscreen-enter-dark.svg');

const lightFullscreenExitIcon = require('../../assets/fullscreen-exit-light.svg');
const darkFullscreenExitIcon = require('../../assets/fullscreen-exit-dark.svg');

const Navigation = ({
  dashboard, theme, toggleTheme, userSignedIn, redirectToDashboard,
}) => {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);

  const toggleIcon = theme.className === 'light' ? lightToggleIcon : darkToggleIcon;
  const fullscreenEnter = theme.className === 'light' ? lightFullscreenEnterIcon : darkFullscreenEnterIcon;
  const fullscreenExit = theme.className === 'light' ? lightFullscreenExitIcon : darkFullscreenExitIcon;

  const fullscreenIcon = fullscreen ? fullscreenExit : fullscreenEnter;

  const fullscreenToggle = () => {
    toggleFullScreen();
    setFullscreen(!fullscreen);
  };

  const textButtonVariant = theme.className === 'light' ? 'outline-dark' : 'outline-light';

  return (
    <React.Fragment>
      <Navbar expand="sm" variant={theme.className}>
        <Navbar.Brand>
          Write-Rite
          {dashboard ? ' - Dashboard' : ''}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {userSignedIn ? (
              <UserSignedIn
                dashboard={dashboard}
                variant={textButtonVariant}
                redirectToDashboard={redirectToDashboard}
              />
            ) : (
              <UserSignedOut
                variant={textButtonVariant}
                showSignIn={() => setShowSignIn(true)}
                showSignUp={() => setShowSignUp(true)}
              />
            )}
            <IconButton
              placement="navbar"
              themeClass={theme.className}
              onClick={toggleTheme}
              iconSrc={toggleIcon}
              iconAltText="ThemeToggle"
            />
            <IconButton
              placement="navbar"
              themeClass={theme.className}
              onClick={fullscreenToggle}
              iconSrc={fullscreenIcon}
              iconAltText="FullscreenToggle"
            />

            <SignIn theme={theme} show={showSignIn} onHide={() => setShowSignIn(false)} />
            <SignUp theme={theme} show={showSignUp} onHide={() => setShowSignUp(false)} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <ThemedHR theme={theme} />
    </React.Fragment>
  );
};

Navigation.defaultProps = {
  dashboard: false,
  userSignedIn: false,
};

Navigation.propTypes = {
  dashboard: PropTypes.bool,
  theme: customProps.theme.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  userSignedIn: PropTypes.bool,
  redirectToDashboard: PropTypes.func.isRequired,
};

export default Navigation;
