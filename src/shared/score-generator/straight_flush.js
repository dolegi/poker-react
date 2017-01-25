// @flow

import Card from '../card';

export default (cards: Array<Card>): number => {
  return cards.slice(0).map(card => card.suit)
    .filter((value, i, self) => self.indexOf(value) === i)
    .reduce((res, suit) => {
      const fCards = cards.filter(card => card.suit === suit);
      if (fCards.length === 5)
        return fCards;
      return res;
    }, [])
    .reverse()
    .reduce((validCards, card, i, self) => {
      if (validCards.length === 5)
        return validCards;
      if (i === self.length - 1) {
        if (validCards.length === 4)
          return validCards.concat([card]);
        if (validCards.length === 3 && card.number === 2 && self[0].number === 14)
          return validCards.concat([card, self[0]]);
        return [];
      }

      const previous = self[i + 1];
      if (previous.number + 1 === card.number)
        return validCards.concat([card]);
      if (previous.number + 1 !== card.number && previous.number !== card.number)
        return [];
      return validCards;
    }, [])
    .map(card => card.number)[0];
}

