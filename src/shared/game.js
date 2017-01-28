// @flow
/* eslint-disable no-console */

import Deck from '../shared/deck';
import Player from '../shared/player';
import Table from '../shared/table';

import scoreGenerator from '../shared/score-generator';

export default class Game {
  table: Table;
  players: Array<Player>;
  stake: number;
  deck: Deck;

  constructor(players: Array<Player>) {
    this.players = players;
    this.table = new Table();
    this.stake = 0;
    this.deck = new Deck();

    this.deck.shuffle();
  }

  nextTurn() {
    this.stake = 0;
    this.players.forEach(p => { p.resetBet() });
  }

  dealPlayers() {
    this.players.forEach(player => player.deal(this.deck.deal(2)));
  }

  makeBet(playerName: string, chips: number) {
    if (chips > this.stake)
      this.stake = chips;
    this.players.find(p => p.name === playerName).bet(chips);
    this.table.receive(chips);
  }

  flop() {
    this.table.cards = this.deck.deal(3);
  }

  turn() {
    this.table.cards = this.table.cards.concat(this.deck.deal(1));
  }

  river() {
    this.table.cards = this.table.cards.concat(this.deck.deal(1));
  }

  getWinners(): Array<Player> {
    this.players.forEach(p =>
      p.setScore(scoreGenerator(p.cards.concat(this.table.cards)))
    );
    this.players.sort((a, b) => b.score - a.score);

    if (this.players.length === 2 && this.players[0].score === this.players[1].score)
      return this.players.slice(0, 2);

    return this.players.slice(0,1);
  }

  payWinners(winners: Array<Player>) {
    winners.forEach(player => player.receive(this.table.chips/winners.length));
  }

  removePlayers(players: Array<Player>) {
    this.players = this.players.filter(x => !players.find(p => p.name === x.name));
  }
}
