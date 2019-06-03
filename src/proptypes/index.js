import PropTypes from 'prop-types';

const theme = PropTypes.shape({
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
});

const toggleTheme = PropTypes.func;

const customProps = {
  theme,
  toggleTheme,
};

export default customProps;
