import React from 'react';
import PropTypes from 'prop-types';

import WritingItem from './WritingItem';

const WritingList = ({ writings }) => Object.entries(writings).map(([id, writing]) => (
  <WritingItem key={id} id={id} writing={writing} />
));

WritingList.propTypes = {
  writings: PropTypes.shape({
    id: PropTypes.string,
    writing: PropTypes.string,
  }).isRequired,
};

export default WritingList;
