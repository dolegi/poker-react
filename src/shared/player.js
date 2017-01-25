// @flow

import Card from './card';

export default class Player {
  name: string;
  chips: number;
  cards: Array<Card>;

  constructor(name: string, chips: number) {
    this.name = name;
    this.chips = chips;
  }

  bet(num: number) {
    this.chips -= num;
  }

  receive(num: number) {
    this.chips += num;
  }

  deal(cards: Array<Card>) {
    this.cards = cards;
  }
}
