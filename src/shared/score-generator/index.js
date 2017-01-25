// @flow

import Card from '../card';
import highCard from './high-card';
import pair from './pair';
import threeOfAKind from './three-of-a-kind';
import straight from './straight';
import flush from './flush';
import fourOfAKind from './four-of-a-kind';
import straightFlush from './straight_flush';

const fullHouse = cards => pair(1)(cards) && threeOfAKind(cards);

const hands = [straightFlush, fourOfAKind, fullHouse, flush, straight,
  threeOfAKind, pair(2), pair(1), highCard];

export default (cards: Array<Card>): number => {
  const sorted = cards.slice(0).sort((a, b) => a.number - b.number);

  return hands.reduce((res, hand, i, s) => res || hand(sorted) + (14*(s.length-1-i)), 0);
};
