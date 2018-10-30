import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import {
  supplierPriceListGetParallelRequest,
  supplierPriceListUpdateRequest,
} from 'redux-base/actions';
import { Table, Spin, Select, Button } from 'antd';
import { table, row, select } from 'styles/common.scss';
import columns from './priceListTabHelpers';

const mapStateToProps = state => ({
  loadingPage: state.supplier.loadingPage,
  priceLists: state.supplier.priceLists,
  priceListData: state.supplier.priceListData,
  needReloadPriceLists: state.supplier.needReloadPriceLists,
});

const mapDispatchToProps = {
  supplierPriceListGetParallelRequest,
  supplierPriceListUpdateRequest,
};

export class PriceListTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPriceLists: [],
      selectedPriceListId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReloadPriceLists) {
      this.props.supplierPriceListGetParallelRequest({
        params: [
          { id: this.props.supplierId }
        ]
      });
      return;
    }

    // const { selectedPriceListId } = this.state;

    // if (!selectedPriceListId) {
    //   this.setState({
    //     selectedPriceListId: nextProps.priceListData.priceList.id,
    //     selectedPriceLists: nextProps.priceListData.data
    //   });
    // }
    if (nextProps.priceListData) {
      this.setState({
        selectedPriceListId: nextProps.priceListData.priceList.id,
        selectedPriceLists: nextProps.priceListData.data
      });
    }
  }

  handlePriceListSelect = (selectedPriceListId) => {
    this.setState({ selectedPriceListId });
  }

  handleAttach = () => {
    this.props.supplierPriceListUpdateRequest({
      id: this.props.supplierId,
      payload: {
        priceListId: this.state.selectedPriceListId
      }
    });
  }

  render() {
    const {
      loadingPage,
      priceLists
    } = this.props;

    const {
      selectedPriceListId,
      selectedPriceLists
    } = this.state;
    // get only buy price list type.
    const filteredPriceList = priceLists.filter(item => item.typeDescription === 'Buy');

    return (
      <div>
        <Row end="xs" middle="xs" className={ row }>
          <Col lg={ 1 }>
            Price List
          </Col>
          <Col xs md={ 6 } lg={ 4 }>
            <Select
              className={ select }
              onChange={ this.handlePriceListSelect }
              value={ selectedPriceListId }
            >
              { filteredPriceList.map(priceList => (
                <Select.Option
                  key={ priceList.id }
                  value={ priceList.id }
                >
                  { priceList.name }
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col lg={ 2 }>
            <Button
              type="primary"
              onClick={ this.handleAttach }
            >
              Attach Price List
            </Button>
          </Col>
          <Col md={ 5 } lg={ 5 } />
        </Row>
        <Spin spinning={ loadingPage }>
          <Row className={ row }>
            <Col xs md lg>
              <Table
                className={ table }
                rowKey="sku"
                size="middle"
                columns={ columns }
                dataSource={ selectedPriceLists }
              />
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

PriceListTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadPriceLists: PropTypes.bool.isRequired,
  // data
  supplierId: PropTypes.string.isRequired,
  priceLists: PropTypes.array.isRequired,
  priceListData: PropTypes.object.isRequired,
  // redux-base
  supplierPriceListGetParallelRequest: PropTypes.func.isRequired,
  supplierPriceListUpdateRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceListTab);
