import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';
import { connect } from 'react-redux';
import {
  customerSearchRequest
} from 'redux-base/actions';
import {
  renderAutocompleteItem
} from 'utils';

const getItemValue = item => item.id.toString();

const renderCustomerItem = renderAutocompleteItem(['id', 'name', 'email'], 'Customer');

const mapStateToProps = state => ({
  loadingAutoComplete: state.autocomplete.loadingAutoComplete,
  customers: state.autocomplete.customers
});

const mapDispatchToProps = {
  customerSearchRequest
};

export class CustomerAutoComplete extends Component {
  onChange = (e, value) => {
    this.props.onChange(value);
    this.props.customerSearchRequest({
      payload: value
    });
  }

  onSelect = (id) => {
    const { name } = this.props.customers.find(item => item.id === Number(id));
    this.props.onSelect(id, name);
  }

  onFocus = () => {
    if (this.props.value) {
      this.props.customerSearchRequest({
        payload: this.props.value
      });
    }
  }

  render() {
    const {
      value,
      loadingAutoComplete,
      customers,
      alignRight = false,
      disabled = false
    } = this.props;

    return (
      <AutoComplete
        items={ customers }
        getItemValue={ getItemValue }
        value={ value }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        onFocus={ this.onFocus }
        renderItem={ renderCustomerItem }
        loadingAutoComplete={ loadingAutoComplete }
        inputPlaceholder="Search Customer"
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

CustomerAutoComplete.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // props
  value: PropTypes.string,
  customers: PropTypes.array.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
  // redux-base
  customerSearchRequest: PropTypes.func.isRequired,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAutoComplete);
