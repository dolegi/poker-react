import React, { PropTypes } from 'react';

const Controls = ({ mode, begin }) => {
  switch(mode) {
    case 'begin':
      return <button className='pure-button pure-button-primary' onClick={begin}>Begin</button>;
    case 'gaming':
      return (<div>
      <button className='pure-button pure-button-primary' onClick=''>Bet</button>
      <button className='pure-button pure-button-primary' onClick=''>Pass</button>
      <button className='pure-button pure-button-primary' onClick=''>Fold</button>
    </div>);
    default:
      return null;
  }
};

Controls.propTypes = {
};

export default Controls;
