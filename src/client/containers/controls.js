import R from 'ramda';
import { connect } from 'react-redux';
import Controls from '../components/controls';
import { begin, newTurn, bet, pass, fold, opponentsTurn, roundTwo } from '../actions/game-actions';

const mapDispatchToProps = dispatch => ({
  begin: (name) => {
    dispatch(begin(name));
    dispatch(newTurn());
  },
  roundOne: {
    bet: (amount) => {
      dispatch(bet(amount));
      dispatch(opponentsTurn());
      dispatch(roundTwo());
    },
    pass: () => {
      dispatch(pass());
      dispatch(opponentsTurn());
      dispatch(roundTwo());
    },
    fold: () => {
      dispatch(fold());
      dispatch(opponentsTurn());
      dispatch(roundTwo());
    },
  },
});

const mapStateToProps = state => ({
  mode: R.path(['controlsMode'], state.getIn(['game'])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
