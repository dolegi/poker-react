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

  getWinners() {
    const scores = this.players.map(player => ({
      name: player.name,
      score: scoreGenerator(player.cards.concat(this.table.cards))
    })).sort((a, b) => b.score - a.score);

    if (scores[0] && scores[1] && scores[0].score === scores[1].score)
      return scores.slice(0, 2).map(s => s.name);

    let winners = scores.slice(0, 1);
    if (winners.length < 1)
      winners = this.players;

    return winners.map(s => s.name);
  }

  payWinners(winners: Array<string>) {
    this.players.filter(player => winners.find(winner => winner === player.name))
        .forEach(player => player.receive(this.table.chips/winners.length));
  }

  removePlayers(players: Array<Player>) {
    this.players = this.players.filter(x => !players.find(p => p.name === x.name));
  }
}
