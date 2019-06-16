import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledButton = styled.button(({ color }) => ({
  zIndex: '1',
  position: 'relative',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: 'white',
  padding: '0.5em 1em',
  outline: 'none',
  border: 'none',
  backgroundColor: 'hsl(236, 32%, 26%)',
  overflow: 'hidden',
  transition: 'color 0.4s ease-in-out',

  '&::before': {
    content: '',
    zIndex: '-1',
    position: 'absolute',
    bottom: '100%',
    right: '100%',
    width: '1em',
    height: '1em',
    borderRadius: '50%',
    backgroundColor: '#3cefff',
    transformOrigin: 'center',
    transform: 'translate3d(50%, 50%, 0) scale3d(0, 0, 0)',
    transition: 'transform 0.45s ease-in-out',
  },

  '&:hover': {
    cursor: 'pointer',
    color: '#161616',

    '&::before': {
      transform: 'translate3d(50%, 50%, 0) scale3d(15, 15, 15)',
    },
  },
}));

const Button = ({ children, color }) => (
  <StyledButton color={color} type="button">
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Button;
