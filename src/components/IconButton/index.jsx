import React from 'react';
import PropTypes from 'prop-types';
import { ThemedButton } from '../../styled-components/index';

const IconButton = ({
  placement, themeClass, onClick, iconSrc, iconAltText,
}) => {
  const variant = themeClass === 'light' ? 'outline-light' : 'outline-dark';

  return (
    <ThemedButton placement={placement} variant={variant} onClick={onClick}>
      <img src={iconSrc} alt={iconAltText} />
    </ThemedButton>
  );
};

IconButton.propTypes = {
  placement: PropTypes.string.isRequired,
  themeClass: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  iconAltText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
