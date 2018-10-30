import React from 'react';
import { connect } from 'react-redux';
import {
  taxCategoriesGetRequest,
} from 'redux-base/actions';
// import fields from '../../modalFields';
// import styles from '../../Supplier.scss';

const mapStateToProps = state => ({
  needReloadTaxCategories: state.taxes.needReloadTaxCategories,
  loadingPage: state.taxes.loadingPage,
  taxCategories: state.taxes.taxCategories,
  taxCodes: state.taxes.taxCodes,
});

const mapDispatchToProps = {
  taxCategoriesGetRequest,
};

export const ReturnsTab = () => (
  <div>
    <h1>Orders</h1>
  </div>
);

ReturnsTab.propTypes = { };

export default connect(mapStateToProps, mapDispatchToProps)(ReturnsTab);
