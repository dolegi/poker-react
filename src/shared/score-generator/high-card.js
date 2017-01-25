// @flow
import Card from '../card';

export default (cards: Array<Card>) => Math.max(...cards.map(card => card.number));
