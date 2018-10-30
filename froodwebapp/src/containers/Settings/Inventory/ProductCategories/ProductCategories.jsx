/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prodCatGetRequest } from 'redux-base/actions';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { PageHeader } from 'components';
import ConnectedProductsTree from './ProductsTree';
import ConnectedNewCategory from './NewCategory';

const mapStateToProps = state => ({
  loadingPage: state.productCategories.loadingPage,
  needReloadProductCategories: state.productCategories.needReloadProductCategories,
  productCategories: state.productCategories.data
});

const mapDispatchToProps = {
  prodCatGetRequest,
};

export class ProductCategories extends Component {
  componentWillMount = () => {
    this.props.prodCatGetRequest();
  }

  componentWillReceiveProps(nextProps) {
    // when we save, update or delete category
    if (nextProps.needReloadProductCategories) {
      this.props.prodCatGetRequest();
    }
  }

  render() {
    const {
      loadingPage,
      productCategories
    } = this.props;

    return (
      <div>
        <PageHeader
          bigText="Product categories"
          smallText="Manage categories hierarchy"
        />
        <Spin spinning={ loadingPage }>
          { (productCategories.length === 0 && !loadingPage) && <ConnectedNewCategory /> }
          { (productCategories.length > 0) && <ConnectedProductsTree /> }
        </Spin>
      </div>
    );
  }
}

ProductCategories.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  needReloadProductCategories: PropTypes.bool.isRequired,
  // data
  productCategories: PropTypes.array.isRequired,
  // redux-base
  prodCatGetRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);
