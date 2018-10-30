import React from 'react';
import PropTypes from 'prop-types';

import styles from './text-area-styles.scss';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    let value = event.target.value || this.state.value;
    this.setState({ value });
    this.props.summary(this.props.symbolData, { id:this.props.id }, value);
  }

  render() {
    return (
      <textarea
        value={this.props.summaryUpto[this.props.id] ? this.props.summaryUpto[this.props.id] : this.state.value}
        placeholder= 'Please write some text in the text area.'
        id={this.props.id}
        onChange={this.handleChange}
        className={styles.textArea}
      />
    );
  }
}
export default TextArea;
