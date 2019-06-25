import React from 'react';
import PropTypes from 'prop-types';
import { ThemedButton } from '../../styled-components/index';

const TextButton = ({
  placement, variant, onClick, children,
}) => (
  <ThemedButton placement={placement} variant={variant} onClick={onClick}>
    {children}
  </ThemedButton>
);

TextButton.propTypes = {
  placement: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;
