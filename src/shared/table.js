// @flow

import Card from './card';

export default class Table {
  chips: number;
  cards: Array<Card>;

  constructor() {
    this.chips = 0;
    this.cards = [];
  }

  clear(): number {
    const chips = this.chips;

    this.cards = [];
    this.chips = 0;

    return chips;
  }

  receive(num: number) {
    this.chips += num;
  }

  print() {
    const cards = this.cards.reduce((sum, c) => `${sum}${c.number}${c.suit}, `, '');
    /* eslint-disable no-console */
    console.log(`Table: ${this.chips} chips | [${cards}]`);
    /* eslint-enable no-console */
  }
}
