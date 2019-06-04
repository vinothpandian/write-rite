import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import { ThemeProvider } from './contexts/Theme';
import { AuthUserProvider } from './contexts/Session';
import { FirebaseProvider } from './contexts/Firebase';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <AuthUserProvider>
          <ThemeProvider>
            <Router>
              <Routes />
            </Router>
          </ThemeProvider>
        </AuthUserProvider>
      </FirebaseProvider>
    </Provider>
  );
}
