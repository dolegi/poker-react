import React, { PropTypes } from 'react';

const Controls = ({ mode, begin }) =>
  <button className='pure-button pure-button-primary' onClick={begin}>Begin</button>;

Controls.propTypes = {
};

export default Controls;
