/* eslint-disable import/no-extraneous-dependencies, no-console */

import assert from 'assert';
import { describe, it } from 'mocha';
import Card from '../../shared/card';
import scoreGenerator from '../../shared/score-generator';

const makeCard = str => new Card(parseInt(str.slice(0, -1), 10), str.slice(-1));

describe('Shared', () => {
  describe('ScoreGenerator', () => {

    [
      { cards: ['4s', '10c', '13c', '11c', '12c', '14c', '14s'], expected: 126 }, // Royal flush
      { cards: ['4s', '14s', '2s', '3c', '5s', '3s', '6h'], expected: 117 }, // Straight flush
      { cards: ['4s', '4h', '2h', '3c', '5h', '3h', '6h'], expected: 118 }, // Straight flush
      { cards: ['4s', '4h', '4d', '4c', '3c', '3c', '3h'], expected: 102 }, // 4 of a kind
      { cards: ['4s', '4h', '4d', '4c', '5c', '2c', '3h'], expected: 102 }, // 4 of a kind
      { cards: ['2s', '3h', '3d', '4s', '5c', '2c', '3h'], expected: 87 }, // Full house
      { cards: ['4s', '3s', '4d', '5s', '6s', '8c', '13s'], expected: 83 }, // Flush
      { cards: ['14s', '14c', '4d', '5d', '6d', '8d', '11d'], expected: 81 }, // Flush
      { cards: ['2s', '3h', '4d', '5s', '6c', '8c', '13h'], expected: 62 }, // Straight
      { cards: ['2s', '3h', '3d', '4s', '5c', '6c', '13h'], expected: 62 }, // Straight
      { cards: ['13s', '11h', '8d', '12s', '10c', '9c', '13h'], expected: 69 }, // Straight
      { cards: ['13s', '2h', '14d', '3s', '5c', '9c', '4h'], expected: 61 }, // Straight
      { cards: ['2s', '3h', '3d', '4s', '5c', '9c', '3h'], expected: 45 }, // 3 of a kind
      { cards: ['2s', '2h', '4d', '4s', '5c', '5c', '13h'], expected: 33 }, // 3 pairs (2 count)
      { cards: ['2s', '14h', '3d', '9s', '5c', '14c', '5h'], expected: 42 }, // 2 pair
      { cards: ['2s', '2h', '8d', '4s', '5c', '14c', '13h'], expected: 16 }, // pair
      { cards: ['2c', '7h', '3d', '4c', '5c', '12c', '11h'], expected: 12 }, // high card
    ].forEach(test => {

      it(`${test.cards} scores ${test.expected}`, () => {
        const actual = scoreGenerator(test.cards.map(s => makeCard(s))); 

        assert.equal(actual, test.expected);
      });
    });
  });
});
