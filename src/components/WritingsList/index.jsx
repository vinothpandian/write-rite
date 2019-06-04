import React from 'react';
import PropTypes from 'prop-types';

import WritingItem from './WritingItem';

const WritingList = ({ writings }) => (
  <ul>
    {Object.entries(writings).map(([id, writing]) => (
      <WritingItem key={id} id={id} writing={writing} />
    ))}
  </ul>
);

WritingList.propTypes = {
  writings: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }).isRequired,
};

export default WritingList;
