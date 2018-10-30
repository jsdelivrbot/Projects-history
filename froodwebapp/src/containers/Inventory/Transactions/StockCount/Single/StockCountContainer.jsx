/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConnectedStockCount from './StockCount/StockCount';

const mapStateToProps = state => ({
  loadingPage: state.priceList.loadingPage,
  priceList: state.priceList.priceList,
  login: state.login.user,
});

export class StockCountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockCountId: this.props.match.params.id,
      isNewStockCount: this.props.match.params.id === 'new'
    };
  }

  componentWillReceiveProps(nextProps) {
    const stockCountId = nextProps.match.params.id;

    this.setState({
      stockCountId,
      isNewStockCount: stockCountId === 'new'
    });
  }


  render() {
    const {
      stockCountId,
      isNewStockCount
    } = this.state;

    return (
      <ConnectedStockCount
        stockCountId={ Number(stockCountId) }
        isNewStockCount={ isNewStockCount }
      />
    );
  }
}

StockCountContainer.propTypes = {
  // router
  match: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(StockCountContainer));
