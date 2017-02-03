import React, { PropTypes } from 'react';

const Table = ({ table }) =>
  <div className="pure-1-12">
    {table.cards.reduce((acc, card) => `${acc} ${card.number}${card.suit}`, '')}
    <div>{table.chips}</div>
  </div>;

Table.propTypes = {
  table: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.shape({
      suit: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
    chips: PropTypes.number.isRequired,
    stake: PropTypes.number.isRequired,
  }).isRequired,
};

export default Table;
