import React from 'react';
import PropTypes from 'prop-types';
import ReactAutoComplete from 'react-autocomplete';
import {
  autoComplete,
  autoCompleteMenuNoItems,
  autoCompleteMenu,
  autoCompleteInput
} from './AutoComplete.scss';

const AutoComplete = ({
  // trigger
  loadingAutoComplete,
  // data
  items,
  value,
  // props
  getItemValue,
  inputRef,
  inputPlaceholder,
  inputStyle = {},
  renderItem,
  alignRight = false,
  disabled = false,
  // handlers
  onChange,
  onSelect,
  onBlur,
  onFocus
}) => (
  <ReactAutoComplete
    ref={ inputRef }
    wrapperProps={ {
      className: autoComplete
    } }
    autoHighlight
    items={ items }
    getItemValue={ getItemValue }
    value={ value }
    onChange={ onChange }
    onSelect={ onSelect }
    renderItem={ renderItem }
    renderMenu={ (renderItems, renderValue) => (
      <div>
        { loadingAutoComplete && <div className={ autoCompleteMenuNoItems }>Loading...</div> }
        {
          !loadingAutoComplete
          && renderItems.length === 0
          && renderValue.length > 2
          && <div className={ autoCompleteMenuNoItems }>No matches for {value}</div>
        }
        {
          !loadingAutoComplete
          && renderItems.length !== 0
          && renderValue.length > 2
          &&
            <div
              className={ autoCompleteMenu }
              style={ { right: alignRight ? 0 : 'auto' } }
            >
              { renderItems }
            </div>
        }
      </div>
    ) }
    inputProps={ {
      lang: 'en',
      placeholder: inputPlaceholder,
      onBlur,
      onFocus,
      disabled,
      className: autoCompleteInput,
      style: {
        backgroundColor: disabled ? '#f7f7f7' : 'white',
        color: disabled ? 'rgba(0, 0, 0, 0.25)' : 'inherit',
        cursor: disabled && 'not-allowed',
        ...inputStyle
      }
    } }
  />
);

AutoComplete.propTypes = {
  // triggers
  loadingAutoComplete: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  // data
  items: PropTypes.array.isRequired,
  value: PropTypes.string,
  // props
  inputRef: PropTypes.func,
  getItemValue: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  inputStyle: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  alignRight: PropTypes.bool,
  // handlers
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

export default AutoComplete;
