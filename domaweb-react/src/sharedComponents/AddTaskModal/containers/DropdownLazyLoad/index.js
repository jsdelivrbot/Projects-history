import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import VirtualizedSelect from 'react-virtualized-select';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import { lazyLoadCustomers, loadCustomers, loadInitialCustomers } from '../../actions';
import { getCustomersSelector } from '../../selectors';
import './DropdownLazyLoad-styles.scss';

import { debounce } from 'lodash';

export function generateOptions(size = 0, i = 0, options = []) {
  console.log("size", size);
  console.log("i", i);
  console.log("options", options);

  if (i === size) return options;

  const option = {
    value: i + 1,
    label: i + 1,
  };
  console.log("option", option)
  return generateOptions(size, i + 1, [ ...options, option ]);
}


export const OPTIONS = generateOptions(20);


const ReactSelectAdapter = ({ input, ...rest }) => (
  <Select {...input} {...rest} searchable />
)


class SelectLazyLoading extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      hasMore: false
    };
  }

  componentWillMount() {
    this.props.loadInitialCustomers();
  }

  logValue = debounce((typed) => {
    //console.log("typed", typed)
    this.setState((prevState, props) => ({
      typed,
    }));
  }, 250);

  setValue = (value) => {
    //console.log("setValue", value);
    this.setState((prevState, props) => ({
      value,
    }));
  }

  setPage = (page) => {
    this.setState((prevState, props) => ({
      page,
    }));
  }

  addOptions = () => {
    this.setState((prevState, props) => ({
      isLoading: true,
    }));
    setTimeout(() => {
      this.setState((prevState, props) => ({
        page: this.state.page + 1,
        isLoading: false,
      }));
    }, 1000);
  }

  handleOpen = () => {
    //console.log("handleopen value");

    this.setPage(1);
  }

  handleChange = (value) => {

    //console.log("handlechange value", value);
    this.setValue(value);
    this.setPage(0);
  }

  handleInputChange = (value) => {
    this.logValue(value);
    if (value.length === 0) this.setPage(1);
  }

  handleMenuScrollToBottom = () => {
    this.addOptions();
  }

  renderOption = ({
    focusedOption,
    focusOption,
    key,
    labelKey,
    option,
    selectValue,
    style,
    valueArray
  }) => {
    const className = ['VirtualizedSelectOption']

    if (option === focusedOption) {
      className.push('VirtualizedSelectFocusedOption')
    }

    if (option.disabled) {
      className.push('VirtualizedSelectDisabledOption')
    }

    if (valueArray && valueArray.indexOf(option) >= 0) {
      className.push('VirtualizedSelectSelectedOption')
    }

    if (option.className) {
      className.push(option.className)
    }

    const events = option.disabled
      ? {}
      : {
        onClick: () => selectValue(option),
        onMouseEnter: () => focusOption(option)
      };

    if (option.disabled) {
      return (
        <div
          className={className.join(' ')}
          key={key}
          style={style}
          title={option.title}
          {...events}
        >
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span className="Select-loading" style={{ marginRight: '0.5em' }}></span>
            <span>{option[labelKey]}</span>
          </div>
        </div>
      )
    }

    return (
      <div
        className={className.join(' ')}
        key={key}
        style={style}
        title={option.title}
        {...events}
      >
        {option[labelKey]}
      </div>
    )
  }

  render() {
    console.log("lazy loading container rendered")
    console.log("render initial customer list <<<<<<<<<<<<<", this.props.customerslist)
    const { value, page, typed, isLoading } = this.state;
    // const options = [
    //   ...generateOptions(page * 10),
    //   isLoading ? { value: 'loading', label: 'Loading more...', disabled: true } : {}
    // ];

    let options = [];
    const customerOption = () => {
     if(this.props.customerslist && this.props.customerlist > 0) {
      this.props.customerslist.forEach((option) => {
        console.log("options", option)
         const optionObject = {};
         if (typeof option === 'object') {
           optionObject.value = option.id;
           optionObject.label = `${option.lastName} ${option.firstName }`;
         } else if (typeof option === 'string') {
           optionObject.value = option;
           optionObject.label = option;
         }
         options.push(optionObject);
       });
       return options;
     }
     return options = [];
   }


    return (
      <div>

            <VirtualizedSelect
              value={value}
              options={this.props.customerslist ? this.props.customerslist.map(option =>({
                value: option.id,
                label: `${option.lastName} ${option.firstName}`
              })) : [] }
              optionRenderer={this.renderOption}
              onOpen={this.handleOpen}
              onChange={this.handleChange}
              onMenuScrollToBottom={this.handleMenuScrollToBottom}
              onInputChange={this.handleInputChange}
            />
        </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  //customerslist: lazyLoadCustomersSelector(),
  customerslist: getCustomersSelector(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    lazyLoadCustomers: bindActionCreators(lazyLoadCustomers, dispatch),
    loadCustomers: bindActionCreators(loadCustomers, dispatch),
    loadInitialCustomers: bindActionCreators(loadInitialCustomers, dispatch),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(SelectLazyLoading);
