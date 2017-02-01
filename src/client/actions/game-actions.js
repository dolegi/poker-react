import { createAction } from 'redux-actions';

export const BEGIN = 'BEGIN';
export const begin = createAction(BEGIN, name => ({ name }));
export const NEW_TURN = 'NEW_TURN';
export const newTurn = createAction(NEW_TURN, () => '');

