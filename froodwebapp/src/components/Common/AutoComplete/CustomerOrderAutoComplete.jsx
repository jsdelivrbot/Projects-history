import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';
import { connect } from 'react-redux';
import {
  customerOrderSearchRequest
} from 'redux-base/actions';
import {
  renderAutocompleteItem
} from 'utils';

const getItemValue = item => item.id.toString();

const renderCustomerOrderItem = renderAutocompleteItem(['id', 'orderDate', 'status'], 'Order');

const mapStateToProps = state => ({
  loadingAutoComplete: state.autocomplete.loadingAutoComplete,
  customerOrders: state.autocomplete.customerOrders
});

const mapDispatchToProps = {
  customerOrderSearchRequest
};

export class CustomerOrderAutoComplete extends Component {
  onChange = (e, value) => {
    this.props.onChange(value);
    this.props.customerOrderSearchRequest({
      id: this.props.customerId,
      payload: value
    });
  }

  onSelect = (id) => {
    const { name } = this.props.customerOrders.find(item => item.id === Number(id));
    this.props.onSelect(id, name);
  }

  onFocus = () => {
    if (this.props.value) {
      this.props.customerOrderSearchRequest({
        id: this.props.customerId,
        payload: this.props.value
      });
    }
  }

  render() {
    const {
      value,
      loadingAutoComplete,
      customerOrders,
      alignRight = false,
      disabled = false
    } = this.props;

    return (
      <AutoComplete
        items={ customerOrders }
        getItemValue={ getItemValue }
        value={ value }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        onFocus={ this.onFocus }
        renderItem={ renderCustomerOrderItem }
        loadingAutoComplete={ loadingAutoComplete }
        inputPlaceholder="Search Orders"
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

CustomerOrderAutoComplete.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // props
  customerId: PropTypes.number.isRequired,
  value: PropTypes.string,
  customerOrders: PropTypes.array.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
  // redux-base
  customerOrderSearchRequest: PropTypes.func.isRequired,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderAutoComplete);
