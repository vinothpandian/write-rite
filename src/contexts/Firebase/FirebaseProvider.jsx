import React from 'react';
import PropTypes from 'prop-types';

import FirebaseContext from './context';
import Firebase from './firebase';

const FirebaseProvider = ({ children }) => {
  const [firebase] = React.useState(() => new Firebase());
  return (
  <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FirebaseProvider;
