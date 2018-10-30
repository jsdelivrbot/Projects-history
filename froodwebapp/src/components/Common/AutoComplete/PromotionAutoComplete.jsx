import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'components';
import { connect } from 'react-redux';
import {
  promotionSearchRequest
} from 'redux-base/actions';
import {
  renderAutocompleteItem
} from 'utils';

const getItemValue = item => item.id.toString();

const renderPromotionItem = renderAutocompleteItem(['id', 'code', 'name'], 'Promotion');

const mapStateToProps = state => ({
  loadingAutoComplete: state.autocomplete.loadingAutoComplete,
  promotions: state.autocomplete.promotions
});

const mapDispatchToProps = {
  promotionSearchRequest
};

class PromotionAutoComplete extends Component {
  onChange = (e, value) => {
    this.props.onChange(value);
    this.props.promotionSearchRequest({
      payload: value
    });
  }

  onSelect = (id) => {
    const { code } = this.props.promotions.find(item => item.id === Number(id));
    this.props.onSelect(id, code);
  }

  onFocus = () => {
    if (this.props.value) {
      this.props.promotionSearchRequest({
        payload: this.props.value
      });
    }
  }

  render() {
    const {
      value,
      loadingAutoComplete,
      promotions,
      alignRight = false,
      disabled = false
    } = this.props;

    return (
      <AutoComplete
        items={ promotions }
        getItemValue={ getItemValue }
        value={ value }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        onFocus={ this.onFocus }
        renderItem={ renderPromotionItem }
        loadingAutoComplete={ loadingAutoComplete }
        inputPlaceholder="Type to search promotion"
        alignRight={ alignRight }
        disabled={ disabled }
      />
    );
  }
}

PromotionAutoComplete.propTypes = {
  // trigger
  loadingAutoComplete: PropTypes.bool.isRequired,
  // props
  value: PropTypes.string,
  promotions: PropTypes.array.isRequired,
  alignRight: PropTypes.bool,
  disabled: PropTypes.bool,
  // redux-base
  promotionSearchRequest: PropTypes.func.isRequired,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotionAutoComplete);
