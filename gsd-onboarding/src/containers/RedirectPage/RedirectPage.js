import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../reduxBase/actions/actions';

class RedirectPage extends Component {
	componentDidMount() {
    this.props.getUserId();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userId.length === 0) {
      this.props.createUserId();
    }
  }
  render() {
  	const userId = this.props.userId.userId;
    return (
    	userId && <Route exact path='/onboarding' render={() => (
          <Redirect to={`/onboarding/${userId}/step1`} />
        )} 
      />
    ) 
  }
}

RedirectPage.propTypes = {
  getUserId: PropTypes.func,
  createUserId: PropTypes.func,
  userId: PropTypes.object,
};

export default connect(
  state => ({
     userId: state.userIdReducer
  }),
  dispatch => bindActionCreators(actions, dispatch))(RedirectPage);
  