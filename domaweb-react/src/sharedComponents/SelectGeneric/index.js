/**
*
* SelectGeneric
*
*/

import React from 'react'; 
 import PropTypes from 'prop-types'
// import styled from 'styled-components';
import styles from './selectGeneric.scss';
import FieldRequired from '../FieldRequired';
import { onlyUpdateForKeys } from 'recompose';
const updateKeys = onlyUpdateForKeys('value');


class SelectGeneric extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      identifier: props.identifier,
    };
    this.updateValue = this.updateValue.bind(this);
  }
  
  updateValue(e) {
    //this.setState({ value: e.target.value });
    const result = {
      value: e.target.value,
      identifier: this.props.identifier,
      required: this.props.required,
    };
    this.props.onSelect(result);
    /*setTimeout(() => {
      this.props.onSelect(result);
      //console.log(result);
    }, 50);*/
  }
  render() {
    console.log(this.props);
    const NewComponent = () => this.props.component;
    //render plain array
    const renderWithoutProperties = () => (
      <select
        value={this.props.value}
        onChange={this.updateValue}
        className={styles.short_box}
      > 
        {this.props.options.map((item, index) =>
        <option
          key={index}
          value={item}
        >
          {item}
        </option>)}
      </select>
    );

    //render according to given propertyName and propertyValue
    const renderWithProperties = () => (
      <select
        value={this.props.value}
        onChange={this.updateValue}
        className={styles.short_box}
      > {this.state.value === '' &&
        <option disabled selected value>{this.props.defaultMessage}</option>}
        {this.props.options.map((item, index) =>
        <option
          key={index}
          value={item[this.props.propertyValue]}
        >
          {item[this.props.propertyName]}
        </option>)}
      </select>
    );

    //given prop named collection, renders options that have label and value properties
    const renderCollection = () => (
      <select
        value={this.props.value}
        onChange={this.updateValue}
        className={styles.short_box}
      > 
        {this.props.defaultMessage &&
        <option disabled selected value>{this.props.defaultMessage}</option>}
        {this.props.options.map((item, index) =>
        <option
          key={index}
          value={item.value}
          label={item.label}
        >
          {item.label}
        </option>)}
      </select>
    );
    return (
      <div className={styles.wrapper}>
        <div>
          {this.props.text && <span className={styles.text}><b>{this.props.text}</b>
            <FieldRequired required={this.props.required} />
          </span>}
          {this.props.component && !this.props.text && 
          <span>
            <b>
              <NewComponent />
            </b>
            <FieldRequired required={this.props.required} />
          </span>}
        </div>
        {this.props.propertyName && this.props.propertyValue && renderWithProperties()}
        {!this.props.propertyName && !this.props.collection && renderWithoutProperties()}
        {this.props.collection && renderCollection()}
      </div>
    );
  }
}

SelectGeneric.propTypes = {
  options: PropTypes.array.isRequired,
  text: PropTypes.string,
  onSelect: PropTypes.func,
  identifier: PropTypes.string,
  required: PropTypes.bool,
  //value: PropTypes.object,
  propertyName: PropTypes.string,
  propertyValue: PropTypes.string,
  defaultMessage: PropTypes.string,
  component: PropTypes.component,
};

export default SelectGeneric;
