import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import {
  itemInfoGetParallelRequest,
  itemBinsGetRequest,
  itemSuppliersGetRequest,
  itemStockLifeCycleGetRequest,
  itemUOMGetRequest,
  itemImagesGetRequest
} from 'redux-base/actions';
import { ActionButton } from 'components';
import {
  ConnectedMainTab,
  ConnectedBinsTab,
  ConnectedSuppliersTab,
  StockLifeCycleTab,
  ConnectedUOMTab,
  ImagesTab
} from './index';

const { TabPane } = Tabs;

const mapStateToProps = state => ({
  loadingPage: state.item.loadingPage,
  initialValues: state.item.itemInfo
});

const mapDispatchToProps = {
  itemInfoGetParallelRequest,
  itemBinsGetRequest,
  itemSuppliersGetRequest,
  itemStockLifeCycleGetRequest,
  itemUOMGetRequest,
  itemImagesGetRequest
};


export class ItemsTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'main',
      hasInitialProductVariants: false,
      productKeyColumnDisabled: false
    };
  }

  componentWillMount() {
    this.props.itemInfoGetParallelRequest({
      params: [{ id: this.props.itemId }]
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isNewSkuItem
       && nextProps.initialValues
       && nextProps.initialValues.options
       && nextProps.initialValues.options.length !== 0) {
      this.setState({
        hasInitialProductVariants: true,
        productKeyColumnDisabled: true
      });
    }
  }

  handleAddProductVariants = () => {
    this.setState({
      hasInitialProductVariants: true
    });
  }

  handleTabClick = (activeTab) => {
    const id = this.props.itemId;
    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'main':
          this.props.itemInfoGetParallelRequest({ params: [{ id }] });
          break;
        case 'bins':
          this.props.itemBinsGetRequest({ id });
          break;
        case 'suppliers':
          this.props.itemSuppliersGetRequest({ id });
          break;
        case 'stockLifeCycle':
          this.props.itemStockLifeCycleGetRequest({ id });
          break;
        case 'uom':
          this.props.itemUOMGetRequest({ id });
          break;
        case 'images':
          this.props.itemImagesGetRequest({ id: this.props.itemId });
          break;
        default:
      }
    });
  }

  render() {
    const {
      activeTab,
      hasInitialProductVariants,
      productKeyColumnDisabled
    } = this.state;

    const {
      itemId,
      isNewSkuItem,
      initialValues,
      loadingPage
    } = this.props;
    const hasVariants = initialValues ? initialValues.variants : false;
    return (
      <Row>
        <Col xs sm md lg>
          <Tabs
            activeKey={ activeTab }
            onTabClick={ this.handleTabClick }
            animated={ false }
            tabBarExtraContent={
              !loadingPage
           && activeTab === 'main'
           && !hasInitialProductVariants
           &&
           <ActionButton onClick={ this.handleAddProductVariants }>
              Add Variants
           </ActionButton>
            }
          >
            <TabPane
              key="main"
              tab="Main"
            >
              <ConnectedMainTab
                itemId={ itemId }
                isNewSkuItem={ isNewSkuItem }
                hasInitialProductVariants={ hasInitialProductVariants }
                productKeyColumnDisabled={ productKeyColumnDisabled }
              />
            </TabPane>
            <TabPane
              key="bins"
              tab="Bins"
            >
              <ConnectedBinsTab
                itemId={ itemId }
              />
            </TabPane>
            <TabPane
              key="suppliers"
              tab="Suppliers"
            >
              <ConnectedSuppliersTab
                itemId={ itemId }
              />
            </TabPane>
            <TabPane
              key="uom"
              tab="UOM"
            >
              <ConnectedUOMTab
                itemId={ itemId }
              />
            </TabPane>
            <TabPane
              key="images"
              tab="Images"
            >
              <ImagesTab
                itemId={ itemId }
              />
            </TabPane>
            { hasVariants &&
              <TabPane
                key="stockLifeCycle"
                tab="Stock LifeCycle"
              >
                <StockLifeCycleTab
                  itemId={ itemId }
                />
              </TabPane>
            }
          </Tabs>
        </Col>
      </Row>
    );
  }
}

ItemsTabs.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  // props
  itemId: PropTypes.string.isRequired,
  isNewSkuItem: PropTypes.bool.isRequired,
  // redux-base
  itemInfoGetParallelRequest: PropTypes.func.isRequired,
  itemBinsGetRequest: PropTypes.func.isRequired,
  itemSuppliersGetRequest: PropTypes.func.isRequired,
  itemStockLifeCycleGetRequest: PropTypes.func.isRequired,
  itemImagesGetRequest: PropTypes.func.isRequired,
  itemUOMGetRequest: PropTypes.func.isRequired,
  // redux-form
  initialValues: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTabs);
