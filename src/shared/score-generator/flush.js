// @flow

import Card from '../card';

export default (cards: Array<Card>): number => {
  return cards.map(card => card.suit)
    .filter((value, i, self) => self.indexOf(value) === i)
    .reduce((res, suit) => {
      return res || cards.filter(card => card.suit === suit)
        .map(card => card.number)[4];
    }, 0);
}

