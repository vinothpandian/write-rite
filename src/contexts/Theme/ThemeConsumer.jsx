import * as React from 'react';

import ThemeContext from './context';

const withTheme = Component => props => (
  <ThemeContext.Consumer>
    {context => <Component {...props} theme={context.theme} toggleTheme={context.toggleTheme} />}
  </ThemeContext.Consumer>
);

export default withTheme;
