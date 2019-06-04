import * as React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme } from '../../contexts/Theme';
import SignOut from '../../components/SignOut';
import WritingList from '../../components/WritingsList';
import customProps from '../../proptypes';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { getWritingsAction } from '../../redux/actions';

const DashboardPage = (props) => {
  const {
    firebase, theme, toggleTheme, user, writings, getWritings,
  } = props;

  React.useEffect(() => {
    getWritings(firebase);
  });

  console.log(writings);

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
        <WritingList writings={writings} />
      </div>
    </div>
  );
};

DashboardPage.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  theme: customProps.theme.isRequired,
  toggleTheme: customProps.toggleTheme.isRequired,
  writings: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }).isRequired,
  user: PropTypes.string,
  getWritings: PropTypes.func.isRequired,
};

DashboardPage.defaultProps = {
  user: '',
};

const mapStateToProps = state => ({
  writings: state.writings,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getWritings: getWritingsAction,
  },
  dispatch,
);

const condition = user => !!user;

export default compose(
  withTheme,
  withFirebase,
  withAuthUser('uid'),
  withAuthorization(condition),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DashboardPage);
