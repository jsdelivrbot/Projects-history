/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConnectedPriceList from './PriceList/PriceList';

const mapStateToProps = state => ({
  loadingPage: state.priceList.loadingPage,
  priceList: state.priceList.priceList,
  login: state.login.user,
});

export class PriceListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceListId: this.props.match.params.id,
      isNewPriceList: this.props.match.params.id === 'new'
    };
  }

  componentWillReceiveProps(nextProps) {
    const priceListId = nextProps.match.params.id;

    this.setState({
      priceListId,
      isNewPriceList: priceListId === 'new'
    });
  }

  render() {
    const {
      priceListId,
      isNewPriceList
    } = this.state;

    return (
      <ConnectedPriceList
        priceListId={ priceListId }
        isNewPriceList={ isNewPriceList }
      />
    );
  }
}

PriceListContainer.propTypes = {
  // router
  match: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(PriceListContainer));
