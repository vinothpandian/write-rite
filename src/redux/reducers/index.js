import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import writingReducer from './writing-reducer';

export default history => combineReducers({
  router: connectRouter(history),
  writings: writingReducer,
});
