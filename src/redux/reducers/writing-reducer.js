import { handleActions } from 'redux-actions';
import { GET_WRITINGS, ADD_WRITING, SAVE_WRITING } from '../actions';

// const defaultState = {
//   1: 'abac',
//   2: 'eafg',
//   3: 'hij',
// };

const initialState = {};

const getWritingsReducer = (state, action) => {
  console.info(action, state);

  return state;
};

const addWritingReducer = (state, action) => {
  console.info(action);

  return state;
};

const saveWritingReducer = (state, action) => {
  console.info(action);

  return state;
};

const reducer = handleActions(
  {
    [GET_WRITINGS]: getWritingsReducer,
    [ADD_WRITING]: addWritingReducer,
    [SAVE_WRITING]: saveWritingReducer,
  },
  initialState,
);

export default reducer;
