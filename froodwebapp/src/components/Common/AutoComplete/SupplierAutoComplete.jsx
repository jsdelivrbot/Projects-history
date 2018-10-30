import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';
import { connect } from 'react-redux';
import {
  supplierSearchRequest
} from 'redux-base/actions';
import {
  renderAutocompleteItem
} from 'utils';

const getItemValue = item => item.id.toString();

const renderSkusItem = renderAutocompleteItem(['id', 'name', 'country'], 'Supplier');

const mapStateToProps = state => ({
  loadingAutoComplete: state.autocomplete.loadingAutoComplete,
  suppliers: state.autocomplete.suppliers
});

const mapDispatchToProps = {
  supplierSearchRequest
};

export class SupplierAutoComplete extends Component {
  onChange = (e, value) => {
    this.props.onChange(value);
    this.props.supplierSearchRequest({
      payload: value
    });
  }

  onSelect = (id) => {
    const { name } = this.props.suppliers.find(item => item.id === Number(id));
    this.props.onSelect(id, name);
  }

  onFocus = () => {
    if (this.props.value) {
      this.props.supplierSearchRequest({
        payload: this.props.value
      });
    }
  }

  render() {
    const {
      value,
      loadingAutoComplete,
      suppliers,
      alignRight = false,
      disabled = false
    } = this.props;

    return (
      <AutoComplete
        items={ suppliers }
        getItemValue={ getItemValue }
        value={ value }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        onFocus={ this.onFocus }
        renderItem={ renderSkusItem }
        loadingAutoComplete={ loadingAutoComplete }
        inputPlaceholder="Search Supplier"
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

SupplierAutoComplete.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // props
  value: PropTypes.string,
  suppliers: PropTypes.array.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
  // redux-base
  supplierSearchRequest: PropTypes.func.isRequired,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierAutoComplete);
