import { createStore } from 'redux';
import { createBrowserHistory } from 'history';

import createRootReducer from './reducers';

export const history = createBrowserHistory();

const store = (env) => {
  if (env === 'production') {
    return createStore(createRootReducer(history));
  }

  return createStore(
    createRootReducer(history),
    //   eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
};

export default store(process.env.NODE_ENV);
