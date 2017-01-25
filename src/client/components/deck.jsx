import React, { PropTypes } from 'react';

const Deck = ({ cards }) => <div>{cards}</div>;

Deck.propTypes = {
  cards: PropTypes.string.isRequired,
};

export default Deck;
