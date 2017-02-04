import React, { PropTypes } from 'react';

const Opponents = ({ opponents }) => (<div>
  {opponents
  .filter(o => !o.folded)
  .map((opponent, i) => (<div className="pure-u-1-8" key={i}>
    <div>{opponent.name}</div>
    <div>{opponent.cards.map(card => `${card.number}${card.suit} `)}</div>
    <div>{opponent.chips}</div>
  </div>))}
</div>);

Opponents.propTypes = {
  opponents: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      suit: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
    chips: PropTypes.number.isRequired,
    currentBet: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    folded: PropTypes.bool.isRequired,
  })).isRequired,
};

export default Opponents;
