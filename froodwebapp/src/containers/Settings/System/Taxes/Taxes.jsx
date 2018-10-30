import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { PageHeader } from 'components';
import {
  taxCategoriesGetRequest,
  taxCodesGetRequest
} from 'redux-base/actions';
import {
  CategoriesTab,
  ConnectedTaxCodesTab
} from './Tabs';

const mapStateToProps = state => ({
  loadingPage: state.taxes.loadingPage,
  // taxCodes: state.taxes.taxCodes,
});

const mapDispatchToProps = {
  taxCategoriesGetRequest,
  taxCodesGetRequest
};

const { TabPane } = Tabs;

export class Taxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'taxCategories'
    };
  }

  componentWillMount() {
    this.props.taxCategoriesGetRequest();
  }

  handleTabClick = (activeTab) => {
    this.setState({
      activeTab
    }, () => {
      switch (activeTab) {
        case 'taxCategories':
          this.props.taxCategoriesGetRequest();
          break;
        case 'taxCodes':
          this.props.taxCodesGetRequest();
          break;
        default:
      }
    });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        <PageHeader
          bigText="Company Tax Settings"
          smallText="Manage company tax codes and tax categories"
        />
        <Row>
          <Col lg>
            <Tabs
              activeKey={ activeTab }
              onTabClick={ this.handleTabClick }
              animated={ false }
            >
              <TabPane
                key="taxCategories"
                tab="Tax Categories"
              >
                <CategoriesTab />
              </TabPane>
              <TabPane
                key="taxCodes"
                tab="Tax Codes"
              >
                <ConnectedTaxCodesTab />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

Taxes.propTypes = {
  // redux-base
  taxCategoriesGetRequest: PropTypes.func.isRequired,
  taxCodesGetRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Taxes);
