import R from 'ramda';
import { connect } from 'react-redux';
import OpponentsCards from '../components/opponents-cards';

const mapStateToProps = state => ({
  opponents: R.path(['opponents'], state.getIn(['game'])),
});

export default connect(mapStateToProps)(OpponentsCards);
