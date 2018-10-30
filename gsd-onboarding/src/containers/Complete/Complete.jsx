import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Paper from 'material-ui/Paper';

import * as actions from '../../reduxBase/actions/actions';

export class Complete extends Component {
	componentDidMount() {
    this.props.addPathToStore(this.props.location.pathname);
  }
  render() {
    const paperStyle = {
      padding: 20,
      textAlign: 'center',
    }; 
    return (
      <Paper zDepth={2} style={paperStyle}>
        <p>
          Thank you for completing the onboarding survey. If you wish to change your responses please contact us. In the meantime, we will get to work creating your market. You may now close this page.
        </p>
      </Paper>
    );
  }
}

Complete.propTypes = {
  location: PropTypes.object,
  addPathToStore: PropTypes.func,
};


export default withRouter(connect(
	state => ({
     
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Complete));
