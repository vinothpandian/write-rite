import { createAction } from 'redux-actions';

export const GET_WRITINGS = 'GET_WRITINGS';
export const getWritingsAction = createAction(GET_WRITINGS);

export const ADD_WRITING = 'ADD_WRITING';
export const addWritingAction = createAction(ADD_WRITING);

export const SAVE_WRITING = 'SAVE_WRITING';
export const saveWritingAction = createAction(SAVE_WRITING);
