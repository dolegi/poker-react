import R from 'ramda';
import { connect } from 'react-redux';
import Table from '../components/table';

const mapStateToProps = state => ({
  table: R.path(['table'], state.getIn(['game'])),
});

export default connect(mapStateToProps)(Table);
