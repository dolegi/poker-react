import React, { PropTypes } from 'react';

class Controls extends React.Component {
  render() {
    switch (this.props.mode) {
      case 'begin':
        return (<div>
          <button className="pure-button pure-button-primary" onClick={() => this.props.begin('Dom')}>Begin</button>
        </div>);
      case 'gaming':
        return (<div>
          <button className="pure-button pure-button-primary" onClick={() => this.props.bet(10)}>Bet</button>
          <button className="pure-button pure-button-primary" onClick="">Pass</button>
          <button className="pure-button pure-button-primary" onClick="">Fold</button>
        </div>);
      default:
        return null;
    }
  }
}

Controls.propTypes = {
  mode: PropTypes.string.isRequired,
  begin: PropTypes.func.isRequired,
  bet: PropTypes.func.isRequired,
};

export default Controls;
