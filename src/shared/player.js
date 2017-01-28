// @flow

import Card from './card';

export default class Player {
  name: string;
  chips: number;
  cards: Array<Card>;
  currentBet: number;

  constructor(name: string, chips: number) {
    this.name = name;
    this.chips = chips;
    this.currentBet = 0;
  }

  bet(num: number) {
    this.currentBet += num;
    this.chips -= num;
  }

  receive(num: number) {
    this.currentBet = 0;
    this.chips += num;
  }

  deal(cards: Array<Card>) {
    this.cards = cards;
  }
}
