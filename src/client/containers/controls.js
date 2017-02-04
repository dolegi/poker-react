import R from 'ramda';
import { connect } from 'react-redux';
import Controls from '../components/controls';
import { begin, newTurn, bet, pass, fold, opponentsTurn } from '../actions/game-actions';

const mapDispatchToProps = dispatch => ({
  begin: (name) => {
    dispatch(begin(name));
    dispatch(newTurn());
  },
  bet: (amount) => {
    dispatch(bet(amount));
    dispatch(opponentsTurn());
  },
  pass: () => {
    dispatch(pass());
    dispatch(opponentsTurn());
  },
  fold: () => {
    dispatch(fold());
    dispatch(opponentsTurn());
  },
});

const mapStateToProps = state => ({
  mode: R.path(['controlsMode'], state.getIn(['game'])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
