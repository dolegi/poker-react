// @flow

import Card from '../card';

export default (cards: Array<Card>): number => {
  return cards.map(card => card.number)
    .filter((item, pos, self) => self.indexOf(item) !== pos)
    .filter((item, pos, self) => self.indexOf(item) !== pos)
    .filter((item, pos, self) => self.indexOf(item) !== pos)
    .slice(-1)[0];
};

