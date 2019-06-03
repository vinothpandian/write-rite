import * as React from 'react';

import THEMES from '../../constants/theme';

const initialThemeContext = {
  theme: THEMES.light,
  toggleTheme: () => {},
};

const ThemeContext = React.createContext(initialThemeContext);

export default ThemeContext;
