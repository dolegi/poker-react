import React, { PropTypes } from 'react';

const buttonStyling = "pure-button pure-button-primary";

class Controls extends React.Component {
  constructor() {
    super();
    this.state = { playerName: '' };
  }

  render() {
    switch (this.props.mode) {
      case 'begin':
        return (<div>
          <input type="text" value={this.state.playerName} onChange={e => this.setState({ playerName: e.target.value })} />
          <button className={buttonStyling} onClick={() => this.props.begin(this.state.playerName)}>Begin</button>
        </div>);
      case 'gaming':
        return (<div>
          <button className={buttonStyling} onClick={() => this.props.bet(10)}>Bet</button>
          <button className={buttonStyling} onClick="">Pass</button>
          <button className={buttonStyling} onClick="">Fold</button>
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
