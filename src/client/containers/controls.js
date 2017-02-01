import R from 'ramda';
import { connect } from 'react-redux';
import Controls from '../components/controls';
import { begin, newTurn } from '../actions/game-actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  begin: (name) => {
    dispatch(begin(name));
    dispatch(newTurn());
  },
});

const mapStateToProps = state => ({
  mode: R.path(['controlsMode'], state.getIn(['game'])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
