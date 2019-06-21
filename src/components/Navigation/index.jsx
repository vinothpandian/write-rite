import React from 'react';
import PropTypes from 'prop-types';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import customProps from '../../proptypes';

import SignIn from '../SignIn';
import SignUp from '../SignUp';

import UserSignedIn from './UserSignedIn';
import UserSignedOut from './UserSignedOut';
import { StyledHR } from '../../styled-components';

const lightIcon = require('../../assets/dark-light-light.svg');
const darkIcon = require('../../assets/dark-light-dark.svg');

const Navigation = ({
  theme, toggleTheme, userSignedIn, redirectToDashboard,
}) => {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);

  const iconSrc = theme.className === 'light' ? lightIcon : darkIcon;
  const iconButtonVariant = theme.className === 'light' ? 'outline-light' : 'outline-dark';
  const textButtonVariant = theme.className === 'light' ? 'outline-dark' : 'outline-light';

  return (
    <React.Fragment>
      <Navbar variant={theme.className}>
        <Nav className="ml-auto">
          {userSignedIn ? (
            <UserSignedIn variant={textButtonVariant} redirectToDashboard={redirectToDashboard} />
          ) : (
            <UserSignedOut
              variant={textButtonVariant}
              showSignIn={() => setShowSignIn(true)}
              showSignUp={() => setShowSignUp(true)}
            />
          )}
          <Button variant={iconButtonVariant} onClick={toggleTheme}>
            <img src={iconSrc} alt="Toggle" />
          </Button>

          <SignIn show={showSignIn} onHide={() => setShowSignIn(false)} />
          <SignUp show={showSignUp} onHide={() => setShowSignUp(false)} />
        </Nav>
      </Navbar>
      <StyledHR theme={theme} />
    </React.Fragment>
  );
};

Navigation.defaultProps = {
  userSignedIn: false,
};

Navigation.propTypes = {
  theme: customProps.theme.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  userSignedIn: PropTypes.bool,
  redirectToDashboard: PropTypes.func.isRequired,
};

export default Navigation;
