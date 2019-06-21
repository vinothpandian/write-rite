import * as React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withTheme } from '../../contexts/Theme';
import Navigation from '../../components/Navigation';
import WritingList from '../../components/WritingsList';
import customProps from '../../proptypes';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { ThemedButton } from '../../styled-components';

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

  const textButtonVariant = theme.className === 'light' ? 'outline-dark' : 'outline-light';

  return (
    <div>
      <Navigation theme={theme} toggleTheme={toggleTheme} dashboard userSignedIn={!!user} />
      <Container>
        <Row>
          <Col xs="12">
            <ThemedButton variant={textButtonVariant} block type="button" onClick={addWriting}>
              Add Writing
            </ThemedButton>
          </Col>
          <Col xs="12">
            <WritingList writings={writings} />
          </Col>
        </Row>
      </Container>
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
