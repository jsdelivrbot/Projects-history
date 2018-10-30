/**
*
* SearchBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './SearchBar-styles.scss';

// Reference source for implementation: https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c

class SearchBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  componentWillMount() {
    this.timer = null;
  }

  onValueChange = (value) => {
    // Clear the current timer (if any)
    clearTimeout(this.timer);
    // Set value to component's state
    this.setState({ value }, () => {
      // If props 'instant' is true, then emit the value immediately,
      // otherwise start the timer with the given wait interval
      if (this.props.instant) {
        this.emitValue();
      } else {
        this.timer = setTimeout(this.emitValue, this.props.waitInterval);
      }
    });
  }

  emitValue = () => {
    this.props.onChange(this.state.value);
  }

  render() {
    // Remove props that are not native/neccessary for input element
    const inputProps = _.omit(this.props, ['className', 'onChange', 'waitInterval', 'instant', 'styles']);
    return (
      <FormattedMessage {...messages.defaultSearchPlaceholder}>
        {placeholderText => (
          <input
            className={this.props.className ? `${styles.SearchBar} ${this.props.className}` : styles.SearchBar}
            type="text"
            placeholder={placeholderText}
            style={this.props.styles || {}}
            onChange={(e) => { this.onValueChange(e.target.value); }}
            {...inputProps}
          />
        )}
      </FormattedMessage>
    );
  }
}

SearchBar.propTypes = {
  /**
   * Callback function for onChange event.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Wait interval (ms) from the last keystroke
   * until onChange event emitted.
   */
  waitInterval: PropTypes.number,
  /**
   * onChange event instantly emitted on every keystroke.
   */
  instant: PropTypes.bool,
  /**
   * Custom class name for the SearchBar component
   */
  className: PropTypes.string,
  /**
   * Custom styles object
   */
  styles: PropTypes.object,
};

SearchBar.defaultProps = {
  waitInterval: 500,
  instant: false,
};

export default SearchBar;
