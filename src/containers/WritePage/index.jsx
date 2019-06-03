import * as React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { withAuthorization } from '../../contexts/Session';

const WritePage = ({ match }) => <div>{match.params.id}</div>;

WritePage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

const condition = user => !!user;

export default withAuthorization(condition)(WritePage);
