import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseProvider } from './contexts/Firebase';

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Tasks
// Dashboard
// TODO: * Login Google + email), logout
// TODO: * Toggle dark / light
// TODO: * List writings

// Writing:
// TODO: * Content editable div
// TODO: * Ctrl S save
// TODO: * Color sentences differently(focus mode)

// Later:
// Settings
// FEATURE: * Focus opt out
// FEATURE: * Choose color
// FEATURE: * Own API
