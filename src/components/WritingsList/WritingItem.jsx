import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const WritingItem = ({ id, writing }) => (
  <li>
    <Link to={`write/${id}`}>{writing}</Link>
  </li>
);

WritingItem.propTypes = {
  id: PropTypes.string.isRequired,
  writing: PropTypes.string.isRequired,
};

export default WritingItem;
