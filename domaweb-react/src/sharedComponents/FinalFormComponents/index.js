/**
*
* Ffcomponents
*
*/

import React from 'react';
// import styled from 'styled-components';
import styles from './ff_components.scss';
import DomaDatepicker from '../DomaDatePicker';
import Domapicker from '../DomaTimePicker';
import CheckboxComponent from '../Checkbox';
import InputComponent from '../Input';
import Textfield from '../TextField';
import RadioGroup from '../RadioGroup';
import SelectComponent from '../Select';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/lib/md';

const Label = ({children}) => <label className={styles.label}>{children}</label>

/** When basic components are wrapped in adapter class, they become final form compatible */

export class Adapter extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value || '',
    }
    this.update = this.update.bind(this);
  }
  update(value) {
    console.log(value);
    this.setState({value: value});
    this.props.input.onChange(value);
  };
  render() {
    console.log('adapter props');
    console.log(this.props);
    //const { value } = this.state;
    //console.log(this.props);
    const { className, input: {onChange, value}, children, meta, errorComponent, ...rest} = this.props;
    return (
      <div className={this.props.className ? this.props.className : undefined}>
        {React.cloneElement(this.props.children, {
          error: meta.error,
          onChange: this.update,
          value: this.state.value,
          ...rest
        })}
      </div>
    );
  }
}

export const Input = (props) =>
  <Adapter {...props}>
    <InputComponent />
  </Adapter>

Input.propTypes = {
  
};

Input.defaultProps = {
  input: {
    onChange: (value) => console.log(value),
    value: '',
    meta: {
      error: undefined,
    }
  }
}

//export default Ffcomponents;

export class Datepicker extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value || undefined,
    }
    //this.update = this.update.bind(this);
  }
  /*update(value) {
    console.log(value);
    this.setState({value: value});
    this.props.input.onChange(value);
  };*/
  render() {
    //const { value } = this.state;
    //console.log(this.props);
    const { className, input: {onChange, value}, children, placeholder, meta, errorComponent, style } = this.props;
    return (
      <div style={style ? style.wrapper : undefined}>
        {children && <Label>{children}</Label>}
        <span>
          <DomaDatepicker startDate={this.state.value} onChange={(data) => onChange(data)} />
          {meta && meta.error && !errorComponent && <span className={styles.error}>{meta.error}</span> }
          {meta && meta.error && errorComponent && errorComponent(meta.error)}
        </span>
      </div>
    );
  }
}

Datepicker.defaultProps = {
  input: {
    onChange: (value) => console.log(value),
    value: '',
    meta: {
      error: undefined,
    }
  }
}


export class Timepicker extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value || undefined,
    }
    //this.update = this.update.bind(this);
  }
  /*update(value) {
    console.log(value);
    this.setState({value: value});
    this.props.input.onChange(value);
  };*/
  render() {
    //const { value } = this.state;
    //console.log(this.props);
    const { className, input: {onChange, value}, children, placeholder, meta, errorComponent, style } = this.props;
    return (
      <div style={style ? style.wrapper : undefined}>
        {children && <Label>{children}</Label>}
        <span>
          <Domapicker startDate={this.state.value} onChange={(data) => onChange(data)} />
          {meta && meta.error && !errorComponent && <span className={styles.error}>{meta.error}</span> }
          {meta && meta.error && errorComponent && errorComponent(meta.error)}
        </span>
      </div>
    );
  }
}

Timepicker.defaultProps = {
  input: {
    onChange: (value) => console.log(value),
    value: '',
    meta: {
      error: undefined,
    }
  }
}


export const Select = ({options, ...rest}) =>
<Adapter {...rest} select>
  <SelectComponent options={options} {...rest} />
</Adapter>

Select.defaultProps = {
  labelName: 'label',
  valueName: 'value',
  input: {
    onChange: (value) => console.log(value),
    value: '',
    meta: {
      error: undefined,
    }
  }
}

export const Textarea = (props) =>
  <Adapter {...props}>
    <Textfield />
  </Adapter>

export class Checkbox extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value || false,
    }
    this.update = this.update.bind(this);
  }
  update(value) {
    if (!this.props.disabled) {
      const newValue = !value;
      this.setState({value: newValue});
      this.props.input.onChange(newValue);
    }
  };
  render() {
    return (
      <div>
        <CheckboxComponent {...this.props} value={this.state.value} handleClick={() => this.update(this.state.value)} />
      </div>
    );
  }
}

export class RadioParent extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value || false,
    }
    this.update = this.update.bind(this);
  }
  update(value) {
    if (!this.props.disabled) {
      this.setState({value: value});
      this.props.input.onChange(value);
    }
  };
  render() {
    //const { value } = this.state;
    //console.log(this.props);
    const { className, input: {onChange, value}, children, placeholder, checkedStyle, uncheckedStyle, size, style, ...rest } = this.props;
    return (
      <div>
        <RadioGroup onChange={this.update} value={value} {...rest}>
          {children}
        </RadioGroup>
      </div>
    );
  }
}