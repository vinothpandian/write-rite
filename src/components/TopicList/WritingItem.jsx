import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment';

import { compose } from 'recompose';
import { ThemedButton } from '../../styled-components';
import withTheme from '../../contexts/Theme/ThemeConsumer';
import customProps from '../../proptypes/index';

const WritingItem = ({
  history, id, topic, timestamp, theme,
}) => (
  <ThemedButton
    theme={theme}
    variant="outline-dark"
    onClick={() => {
      history.push(`write/${id}`);
    }}
    block
  >
    <span className="float-left">{topic}</span>
    <span className="float-right">{moment(timestamp).fromNow()}</span>
  </ThemedButton>
);

WritingItem.propTypes = {
  id: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  theme: customProps.theme.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default compose(
  withTheme,
  withRouter,
)(WritingItem);
