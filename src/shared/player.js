// @flow

import Card from './card';

export default class Player {
  name: string;
  chips: number;
  cards: Array<Card>;
  currentBet: number;
  score: number;

  constructor(name: string, chips: number) {
    this.name = name;
    this.chips = chips;
    this.currentBet = 0;
    this.score = 0;
  }

  resetBet() {
    this.currentBet = 0;
  }

  setScore(val: number) {
    this.score = val;
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
