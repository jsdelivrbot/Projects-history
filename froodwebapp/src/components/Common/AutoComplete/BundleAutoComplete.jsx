import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';
import { connect } from 'react-redux';
import {
  bundleSearchRequest
} from 'redux-base/actions';
import {
  renderAutocompleteItem
} from 'utils';

const getItemValue = item => item.id.toString();

const renderBundleItem = renderAutocompleteItem(['id', 'name', 'skuCode', 'locationName'], 'Sku');

const mapStateToProps = state => ({
  loadingAutoComplete: state.autocomplete.loadingAutoComplete,
  bundles: state.autocomplete.bundles,
});

const mapDispatchToProps = {
  bundleSearchRequest
};

export class BundleAutoComplete extends Component {
  onChange = (e, value) => {
    this.props.onChange(value);
    this.props.bundleSearchRequest({
      payload: value
    });
  }

  onSelect = (id) => {
    const { bundles } = this.props;
    const { name } = bundles.find(item => item.id === id);
    this.props.onSelect(id, name);
  }

  onFocus = () => {
    if (this.props.value) {
      this.props.bundleSearchRequest({
        payload: this.props.value
      });
    }
  }

  render() {
    const {
      value,
      loadingAutoComplete,
      bundles,
      alignRight = false,
      disabled = false
    } = this.props;

    return (
      <AutoComplete
        items={ bundles }
        getItemValue={ getItemValue }
        value={ value }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        onFocus={ this.onFocus }
        renderItem={ renderBundleItem }
        loadingAutoComplete={ loadingAutoComplete }
        inputPlaceholder="Bundle"
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

BundleAutoComplete.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // props
  value: PropTypes.string,
  bundles: PropTypes.array.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
  // redux-base
  bundleSearchRequest: PropTypes.func.isRequired,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BundleAutoComplete);
