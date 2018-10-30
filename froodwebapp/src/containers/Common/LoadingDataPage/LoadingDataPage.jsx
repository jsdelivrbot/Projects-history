import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import config from 'config';
import { loadingDataPage } from './LoadingDataPage.scss';

const mapStateToProps = state => ({
  user: state.login.user,
  commonDataLoading: state.commonData.commonDataLoading,
  commonDataLoaded: state.commonData.commonDataLoaded,
});

const mapDispatchToProps = {
  push
};

export class LoadingDataPage extends Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleRedirect(nextProps.commonDataLoaded, nextProps.location);
  }

  handleRedirect = (commonDataLoaded, location) => {
    if (commonDataLoaded) {
      const redirectFrom = location.state && location.state.redirectFrom;
      const redirectToId = location.state && location.state.id;
      const redirectToNewScreen = redirectFrom && redirectFrom.includes('new');

      if (redirectFrom && redirectToNewScreen) {
        this.props.push({
          pathname: redirectFrom,
          state: {
            id: 'new'
          }
        });
      } else if (redirectFrom && redirectToId) {
        this.props.push({
          pathname: redirectFrom,
          state: {
            id: redirectToId
          }
        });
      } else if (redirectFrom) {
        this.props.push(redirectFrom);
      } else {
        this.props.push(config.homeRedirectLink);
      }
    }
  }

  render() {
    const { commonDataLoading } = this.props;
    return (
      <div className={ loadingDataPage }>
        <Spin
          size="large"
          spinning={ commonDataLoading }
          tip="Loading Application Data..."
        />
      </div>
    );
  }
}

LoadingDataPage.propTypes = {
  user: PropTypes.object.isRequired,
  commonDataLoading: PropTypes.bool.isRequired,
  commonDataLoaded: PropTypes.bool.isRequired,
  // router
  push: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingDataPage));
