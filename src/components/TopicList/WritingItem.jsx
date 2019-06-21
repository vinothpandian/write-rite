import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import { ThemedButton } from '../../styled-components';

const WritingItem = ({ history, id, topic }) => (
  <ThemedButton
    variant="outline-dark"
    onClick={() => {
      history.push(`write/${id}`);
    }}
    block
  >
    {topic}
  </ThemedButton>
);

WritingItem.propTypes = {
  id: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(WritingItem);
