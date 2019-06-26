import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ThemeContext from '../../contexts/Theme';

const StyledSpan = styled.span(({ themeClass }) => {
  const color = themeClass === 'light' ? 'black' : 'white';

  return {
    '& span': {
      color: `${color} !important`,
    },
  };
});

const FocusedText = ({ attributes, children }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <StyledSpan themeClass={theme.className} {...attributes}>
      {children}
    </StyledSpan>
  );
};

FocusedText.propTypes = {
  // eslint-disable-next-line
  attributes: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default FocusedText;
