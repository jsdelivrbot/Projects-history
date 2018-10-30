import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';
import { connect } from 'react-redux';
import {
  skuSearchRequest,
  skuSearchByVendorRequest
} from 'redux-base/actions';
import { renderAutocompleteItem } from 'utils';

const getItemValue = item => item.id.toString();

const renderSkusItem = renderAutocompleteItem(['id', 'name', 'skuCode'], 'Sku/Variants');

const mapStateToProps = state => ({
  loadingAutoComplete: state.autocomplete.loadingAutoComplete,
  skus: state.autocomplete.skus
});

const mapDispatchToProps = {
  skuSearchRequest,
  skuSearchByVendorRequest
};

export class SkuAutoComplete extends Component {
  onChange = (e, value) => {
    if (this.props.vendorId) {
      this.props.skuSearchByVendorRequest({
        vendorId: this.props.vendorId,
        payload: value
      });
    } else {
      this.props.skuSearchRequest({
        payload: value
      });
    }
    this.props.onChange(value);
  }

  onSelect = (id) => {
    const { skus } = this.props;
    const { name } = skus.find(item => item.id === id);
    this.props.onSelect(id, name);
  }

  onFocus = () => {
    const {
      value,
      vendorId
    } = this.props;

    if (value && vendorId) {
      this.props.skuSearchByVendorRequest({
        vendorId,
        payload: value
      });
    } else if (value) {
      this.props.skuSearchRequest({
        payload: value
      });
    }
  }

  render() {
    const {
      value,
      loadingAutoComplete,
      skus,
      alignRight = false,
      disabled = false,
      inputStyle
    } = this.props;

    return (
      <AutoComplete
        items={ skus }
        getItemValue={ getItemValue }
        value={ value }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        onFocus={ this.onFocus }
        renderItem={ renderSkusItem }
        loadingAutoComplete={ loadingAutoComplete }
        inputPlaceholder="Start typing SKU or name..."
        alignRight={ alignRight }
        disabled={ disabled }
        inputStyle={ inputStyle }
      />
    );
  }
}

SkuAutoComplete.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // props
  value: PropTypes.string,
  vendorId: PropTypes.number,
  skus: PropTypes.array.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  // redux-base
  skuSearchRequest: PropTypes.func.isRequired,
  skuSearchByVendorRequest: PropTypes.func.isRequired,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SkuAutoComplete);
