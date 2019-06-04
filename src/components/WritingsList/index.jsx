import React from 'react';
import PropTypes from 'prop-types';

import WritingItem from './WritingItem';

const WritingList = ({ writings }) => (
  <ul>
    {writings.map(writing => (
      <WritingItem writing={writing} />
    ))}
  </ul>
);

WritingList.propTypes = {
  writings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WritingList;
