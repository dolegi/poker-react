import { createAction } from 'redux-actions';

export const BEGIN = 'BEGIN';
export const begin = createAction(BEGIN, name => ({ name }));

export const NEW_TURN = 'NEW_TURN';
export const newTurn = createAction(NEW_TURN, count => count);

export const BET = 'BET';
export const bet = createAction(BET, amount => ({ amount }));

export const PASS = 'PASS';
export const pass = createAction(PASS, () => {});

export const FOLD = 'FOLD';
export const fold = createAction(FOLD, () => {});

export const OPPONENTS_TURN_ONE = 'OPPONENTS_TURN_ONE';
export const opponentsTurnOne = createAction(OPPONENTS_TURN_ONE, () => {});

export const ROUND_TWO = 'ROUND_TWO';
export const roundTwo = createAction(ROUND_TWO, () => {});

export const OPPONENTS_TURN_TWO = 'OPPONENTS_TURN_TWO';
export const opponentsTurnTwo = createAction(OPPONENTS_TURN_TWO, () => {});
