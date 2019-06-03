import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import { ThemeProvider } from './contexts/Theme';
import { AuthUserProvider } from './contexts/Session';

export default function App() {
  return (
    <AuthUserProvider>
      <ThemeProvider>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </AuthUserProvider>
  );
}
