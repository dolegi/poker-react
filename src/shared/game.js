// @flow
/* eslint-disable no-console */

import Deck from '../shared/deck';
import Player from '../shared/player';
import Table from '../shared/table';

import scoreGenerator from '../shared/score-generator';

const print = (status, player, score) => {
  console.log(`${status} | ${player.name} ${player.chips} [${player.cards.reduce((sum, c) => sum + `${c.number}${c.suit}, `, '')} ${score.score}]`);
}

export default class Game {
  table: Table;
  players: Array<Player>;
  deck: Deck;

  constructor(players: Array<Player>) {
    this.players = players;
    this.table = new Table();
    this.deck = new Deck();

    this.deck.shuffle();
  }

  dealPlayers() {
    this.players.forEach(player => player.deal(this.deck.deal(2)));
  }

  makeBet(playerName: string, chips: number) {
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

  endGame() {
    const scores = this.players
      .map(player => ({name: player.name, score: scoreGenerator(player.cards.concat(this.table.cards))}))
      .sort((a, b) => b.score - a.score);

    this.players.forEach(player => player.deal([]));
    const chips = this.table.chips;
    let status = '';

    if (scores[0].score === scores[1].score) {
      this.players.filter(player => scores.find(score => player.name === score.name))
        .forEach(player => player.receive(chips/2));
      status = 'draw';
    } else {
      const winner = this.players.find(player => player.name === scores[0].name);
      winner.receive(chips);
      status = `${winner.name} won`;
    }
    this.players.forEach(p => print(status, p, scores.find(s => s.name === p.name)));
  }
}
