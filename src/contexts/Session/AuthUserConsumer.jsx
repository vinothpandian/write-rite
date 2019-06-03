import * as React from 'react';

import AuthUserContext from './context';

const withAuthUser = Component => props => (
  <AuthUserContext.Consumer>
    {authUser => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default withAuthUser;
