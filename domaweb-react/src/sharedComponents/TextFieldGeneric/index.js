/**
*
* TextFieldGeneric
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';
// import styled from 'styled-components';
import styles from './textFieldGeneric.scss';
import FieldRequired from '../FieldRequired';


class TextFieldGeneric extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      identifier: props.identifier,
    };
    this.updateValue = this.updateValue.bind(this);
    this.focusInput = this.focusInput.bind(this);
  }
  componentWillMount() {
    this.timer = null;
  }
  focusInput() {
    this.textInput.focus();
  }
  updateValue(e) {
    //e.preventDefault();
    clearTimeout(this.timer);
    this.setState({ value: e.target.value });
    //console.log(this.state.value);
    this.timer = setTimeout(() => {
      this.props.submit(this.state);
    }, 500);
  }

  render() {
    //console.log('textfield rerendered');
    //console.log(this.state.identifier);
    const { area, text, required, areaRows, children, color } = this.props;
    return (
      <div>
        <div>
          {this.props.text &&
            <span className={styles.text}>
              <b>
                {this.props.text}
                <FieldRequired required={this.props.required} />
              </b>
            </span>}
          {!text && children &&
            <span className={styles.text}>
              <b>
                {children}
                <FieldRequired required={this.props.required} />
              </b>
            </span>
          }
        </div>
            {!area && <input
              type="text"
              value={this.state.value}
              onChange={this.updateValue}
              className={styles.textfield}
            />}
            {area &&
              <textarea
                rows={areaRows}
                type="text"
                value={this.state.value}
                onChange={this.updateValue}
                className={styles.textArea}
                style={{ 'color': color }}
              />
            }
      </div>
    );
  }
}

TextFieldGeneric.propTypes = {
  text: PropTypes.string || PropTypes.object,
  size: PropTypes.string,
  identifier: PropTypes.string,
  submit: PropTypes.func,
  required: PropTypes.bool,
  area: PropTypes.bool,
};

export default TextFieldGeneric;
