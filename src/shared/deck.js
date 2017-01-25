// @flow

import Card from './card';

function createSuit(suit: string): Array<Card> {
  return Array(13).fill().map((_, i) => new Card((i + 2), suit));
}

class Deck {
  cards: Array<Card>;

  constructor() {
    this.cards = createSuit('\u2660').concat(
      createSuit('\u2663'),
      createSuit('\u2665'),
      createSuit('\u2666'));
  }

  shuffle() {
    for (let i = this.cards.length; i; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const k = i - 1;
      const x = this.cards[k];
      this.cards[k] = this.cards[j];
      this.cards[j] = x;
    }
  }

  deal(num: number) {
    return this.cards.splice(0, num);
  }
}

export default Deck;
