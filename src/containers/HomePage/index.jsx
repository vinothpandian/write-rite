import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';
import { withAuthUser } from '../../contexts/Session';
import { DASHBOARD } from '../../constants/routes';

const HomePage = ({ user }) => (
  <div>
    Some information about write-rite
    {user ? (
      <div>
        <ul>
          <li>
            <Link to={DASHBOARD}> Dashboard</Link>
          </li>
        </ul>
      </div>
    ) : (
      <div>
        <hr />
        <SignUp />
        <hr />
        <SignIn />
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  // Disable eslint from checking prop-type of firebase user
  // eslint-disable-next-line
  user: PropTypes.any,
};

export default compose(withAuthUser())(HomePage);
