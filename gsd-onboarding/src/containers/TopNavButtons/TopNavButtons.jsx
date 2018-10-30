import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../reduxBase/actions/actions';

import {
  NavButtons,
} from '../../components';

export class TopNavButtons extends Component {
  render() {
    return (
      <div className="d-flex justify-content-around">
        <NavButtons path={this.props.path} />
      </div>
    );
  }
}

TopNavButtons.propTypes = {
  path: PropTypes.array,
};

export default connect(
  state => ({
    path: state.pathToStoreReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(NavButtons);

