// @flow

import Card from '../card';

export default (amount:number) => (cards: Array<Card>): number => {
  return cards.map(card => card.number)
    .filter((value, i, self) => self.indexOf(value) !== i) // duplicates
    .filter((value, i, self) => self.filter(num => num === value).length === 1) // once
    .find((value, i, self) => {
      if (self.length > amount)
        return i === self.length -1; // 3 pairs found
      return i === amount - 1; // check pairs found meets amount
    });
};

