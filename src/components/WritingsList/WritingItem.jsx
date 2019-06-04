import React from 'react';
import PropTypes from 'prop-types';

const WritingItem = ({ writing }) => <li>{writing}</li>;

WritingItem.propTypes = {
  writing: PropTypes.string.isRequired,
};

export default WritingItem;
