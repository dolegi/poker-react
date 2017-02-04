import R from 'ramda';
import { connect } from 'react-redux';
import Controls from '../components/controls';
import { begin, newTurn, bet, pass, fold, opponentsTurnOne, roundTwo, opponentsTurnTwo } from '../actions/game-actions';

const mapDispatchToProps = dispatch => ({
  begin: (name) => {
    dispatch(begin(name));
    dispatch(newTurn());
  },
  roundOne: {
    bet: (amount) => {
      dispatch(bet(amount));
      dispatch(opponentsTurnOne());
      dispatch(roundTwo());
    },
    pass: () => {
      dispatch(pass());
      dispatch(opponentsTurnOne());
      dispatch(roundTwo());
    },
    fold: () => {
      dispatch(fold());
      dispatch(opponentsTurnOne());
      dispatch(roundTwo());
    },
  },
  roundTwo: {
    pass: () => {
      dispatch(pass());
      dispatch(opponentsTurnTwo());
      dispatch(newTurn());
    },
    fold: () => {
      dispatch(fold());
      dispatch(opponentsTurnTwo());
      dispatch(newTurn());
    },
  },
});

const mapStateToProps = state => ({
  mode: R.path(['controlsMode'], state.getIn(['game'])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
