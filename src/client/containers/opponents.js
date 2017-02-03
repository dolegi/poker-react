import R from 'ramda';
import { connect } from 'react-redux';
import Opponents from '../components/opponents';

const mapStateToProps = state => ({
  opponents: R.path(['opponents'], state.getIn(['game'])),
});

export default connect(mapStateToProps)(Opponents);
