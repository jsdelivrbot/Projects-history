import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  supplierInfoGetRequest,
  supplierLocationsGetParallelRequest,
  supplierNotesGetRequest,
  supplierContactsGetRequest,
  supplierOrdersGetRequest,
  supplierPriceListGetParallelRequest,
} from 'redux-base/actions';
import {
  ConnectedMainTab,
  ConnectedLocationsTab,
  ConnectedContactsTab,
  ConnectedOrdersTab,
  ConnectedPriceListTab,
  ConnectedReturnsTab,
  ConnectedNotesTab
} from './index';

const { TabPane } = Tabs;

const mapStateToProps = state => ({
  countryId: state.supplier.data.country.id
});

const mapDispatchToProps = {
  supplierInfoGetRequest,
  supplierLocationsGetParallelRequest,
  supplierNotesGetRequest,
  supplierContactsGetRequest,
  supplierOrdersGetRequest,
  supplierPriceListGetParallelRequest,
};

export class PurchaseSupplierTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'main',
      activeAddressId: null
    };

    if (this.props.location.state) {
      this.state = Object.assign({}, this.state, props.location.state);
    }
  }

  componentDidMount() {
    this.handleTabClick(this.state.activeTab);
  }

  handleTabClick = (activeTab) => {
    const {
      supplierId,
      countryId
    } = this.props;

    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'main':
          this.props.supplierInfoGetRequest({ id: supplierId });
          break;
        case 'locations':
          this.props.supplierLocationsGetParallelRequest({
            params: [
              { id: supplierId },
              { countryId }
            ]
          });
          break;
        case 'contacts':
          this.props.supplierContactsGetRequest({ id: supplierId });
          break;
        case 'orders':
          this.props.supplierOrdersGetRequest({ id: supplierId });
          break;
        case 'pricelist':
          this.props.supplierPriceListGetParallelRequest({
            params: [{
              id: supplierId
            }]
          });
          break;
        case 'notes':
          this.props.supplierNotesGetRequest({ id: supplierId });
          break;
        default:
      }
    });
  }

  render() {
    const {
      activeTab,
      activeAddressId
    } = this.state;

    const {
      supplierId,
      countryId,
      isNewSupplier
    } = this.props;

    return (
      <Row>
        <Col xs>
          <Tabs
            activeKey={ activeTab }
            onTabClick={ this.handleTabClick }
            animated={ false }
          >
            <TabPane
              key="main"
              tab="Main"
            >
              <ConnectedMainTab
                supplierId={ supplierId }
                isNewSupplier={ isNewSupplier }
              />
            </TabPane>
            <TabPane
              key="locations"
              tab="Locations"
            >
              <ConnectedLocationsTab
                supplierId={ supplierId }
                countryId={ countryId }
                activeAddressId={ activeAddressId }
              />
            </TabPane>
            <TabPane
              key="contacts"
              tab="Contacts"
            >
              <ConnectedContactsTab
                supplierId={ supplierId }
              />
            </TabPane>
            <TabPane
              key="orders"
              tab="Orders"
            >
              <ConnectedOrdersTab
                supplierId={ supplierId }
              />
            </TabPane>
            <TabPane
              key="pricelist"
              tab="Price List"
            >
              <ConnectedPriceListTab
                supplierId={ supplierId }
              />
            </TabPane>
            <TabPane
              key="returns"
              tab="Returns"
            >
              <ConnectedReturnsTab />
            </TabPane>
            <TabPane
              key="notes"
              tab="Notes"
            >
              <ConnectedNotesTab
                supplierId={ supplierId }
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

PurchaseSupplierTabs.propTypes = {
  // props
  supplierId: PropTypes.string.isRequired,
  isNewSupplier: PropTypes.bool.isRequired,
  countryId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  // redux-base
  supplierInfoGetRequest: PropTypes.func.isRequired,
  supplierLocationsGetParallelRequest: PropTypes.func.isRequired,
  supplierNotesGetRequest: PropTypes.func.isRequired,
  supplierContactsGetRequest: PropTypes.func.isRequired,
  supplierOrdersGetRequest: PropTypes.func.isRequired,
  supplierPriceListGetParallelRequest: PropTypes.func.isRequired,
  // router
  location: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseSupplierTabs));
