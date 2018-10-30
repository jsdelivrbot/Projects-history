/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { push } from 'react-router-redux';
import {
  priceListsGetRequest
} from 'redux-base/actions';
import { PageHeader, FroodSearchInput } from 'components';
import { table } from 'styles/common.scss';
import { ConnectedTopButtons } from 'containers/Common/MainContainer/MainContainerSections';
import columns from './priceListHelpers';

const mapStateToProps = state => ({
  loadingPage: state.priceLists.loadingPage,
  priceLists: state.priceLists.priceLists,
});

const mapDispatchToProps = {
  priceListsGetRequest,
  push
};

export class PriceLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }

  componentDidMount = () => {
    this.props.priceListsGetRequest();
  }

  handleEdit = (e) => {
    const priceListId = e.target.id;
    const { code } = this.props.priceLists.find(item => item.id === Number(priceListId));
    const url = `/settings/system/price-lists/${priceListId}/${code}`;
    this.props.push(url);
  }

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  }

  render() {
    const {
      priceLists,
      loadingPage
    } = this.props;

    const { searchValue } = this.state;

    const data = priceLists.filter(item =>
      item && item.name && item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div>
        <ConnectedTopButtons
          newButtonVisible
          newButtonText="New Price List"
          newButtonLink="/settings/system/price-lists/new"
        />
        <PageHeader
          bigText="Price Lists"
          smallText="A price list is non-standart set of prices that can be attached to channels (Sell Type) or vendors (Buy Type)."
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col lg={ 4 }>
              <FroodSearchInput
                onChange={ this.handleSearchChange }
                placeholder="Type to search price lists"
              />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <Table
                className={ table }
                columns={ columns(this.handleEdit) }
                dataSource={ data }
                size="small"
                rowKey="id"
                pagination={ false }
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

PriceLists.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  // data
  priceLists: PropTypes.array.isRequired,
  // redux-base
  priceListsGetRequest: PropTypes.func.isRequired,
  // router
  push: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceLists);
