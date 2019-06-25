import React from 'react';
import PropTypes from 'prop-types';

import WritingItem from './WritingItem';

const TopicList = ({ writings }) => {
  const topicList = writings.map(writing => (
    <WritingItem
      key={writing.id}
      id={writing.id}
      topic={writing.topic}
      timestamp={writing.timestamp}
    />
  ));

  return topicList;
};

TopicList.propTypes = {
  writings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      topic: PropTypes.string,
      timestamp: PropTypes.number,
    }),
  ).isRequired,
};

export default TopicList;
