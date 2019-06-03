import * as React from 'react';
import PropTypes from 'prop-types';

import { Global, css } from '@emotion/core';
import THEMES from '../../constants/theme';
import ThemeContext from './context';

const ThemeProvider = ({ children }) => {
  const storedThemes = localStorage.getItem('THEMES') || JSON.stringify(THEMES);
  const themes = JSON.parse(storedThemes);

  const storedCurrentTheme = localStorage.getItem('theme') || JSON.stringify(themes.light);
  const currentTheme = JSON.parse(storedCurrentTheme);

  const [theme, setTheme] = React.useState(currentTheme);

  const { light, dark } = themes;

  const toggleTheme = () => {
    const newTheme = theme.className === light.className ? dark : light;

    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Global
        styles={css`
          * {
            background: ${theme.backgroundColor};
            color: ${theme.fontColor};
          }
        `}
      />
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ThemeProvider;
