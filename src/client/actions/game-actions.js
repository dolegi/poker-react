import { createAction } from 'redux-actions';

export const BEGIN = 'BEGIN';
export const begin = createAction(BEGIN, () => {
  return { game: x => x };
});

