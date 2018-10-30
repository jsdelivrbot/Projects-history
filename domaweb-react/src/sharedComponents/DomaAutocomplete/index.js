/**
*
* DomaAutocomplete
* UNFINISHED BUT USABLE
*/

import React from 'react';
// import styled from 'styled-components';
import styles from './domaAutocomplete.scss';
import PropTypes from 'prop-types';
import FieldRequired from '../FieldRequired';
const closeIcon = require('../../assets/images/newSVG/icon_close.svg');

class DomaAutocomplete extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      searchParams: '',
      selectedItem: 0,
      searching: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.format = this.format.bind(this);
    /*this.handleStatelessChange = this.handleStatelessChange.bind(this);
    this.handleStatelessClick = this.handleStatelessClick.bind(this);
    this.handleStatelessEnter = this.handleStatelessEnter.bind(this);*/
  }
  format() {
    this.setState({searchParams: ''});
    this.setState({selectedItem: 0});
    this.setState({searching: false});
  }
  handleChange(event) {
    let temp = event.target.value.replace(/[\[\]']+/g,'').replace(/[()]/g,"");
    //temp = temp.replace(/[()]/g,"");
    if (this.state.searchParams.length === 0) {
      this.setState({ selectedItem: 0 });
    }
    this.setState({searching: true});
    this.setState({searchParams: temp});
  }
  handleClick(item) {
    console.log('clicked');
    console.log(item);
    this.setState({ searchParams: item[this.props.propName] });
    this.setState({ selectedItem: 0 });
    this.setState({searching: false});
    if (this.props.returnObject) {
      this.props.onChange(item);
    } else {
      this.props.onChange(item[this.props.propName]);
    }
  }
  handleEnter(item) {
    console.log('entered');
    console.log(item);
    this.setState({ searchParams: item[this.props.propName] });
    this.setState({ selectedItem: 0 });
    this.setState({searching: false});
    if (this.props.returnObject) {
      this.props.onChange(item);
    } else {
      this.props.onChange(item[this.props.propName]);
    }
  }
  /*handleStatelessChange(event) {
    this.setState({searchParams: event.target.value});
    console.log(event.target.value);
    this.props.onChange(event.target.value);
  }
  handleStatelessClick(item) {
    console.log('clicked');
    console.log(item);
    this.setState({ searchParams: item[this.props.propName] });
    this.setState({selectedItem: 0});
  }
  handleStatelessEnter(item) {
    console.log('entered');
    console.log(item);
    this.setState({ searchParams: item[this.props.propName] });
    this.setState({ selectedItem: 0 });
  }*/

  componentWillMount() {
    if (this.props.value && this.props.takeObject) {
      this.setState({ searchParams: this.props.value[this.props.propName] });
    } else if (this.props.value && !this.props.takeObject) {
      this.setState({ searchParams: this.props.value });
    }
  }

  render() {
    //const closeIcon = require('../../../assets/images/newSVG/icon_close.svg');
    console.log('autofuckery');
    console.log(this.props);
    console.log(this.state);
    const { list, search, propName, stateless, required, text, value, onChange, returnObject, maxSize, defaultStyles } = this.props;
    /*const defaultStyles = {
      primary_text: '#808080',
      secondary_text: '#e6e6e6',
    };*/
    if (!list) {
      return null;
    }
    
    const filteredList = list.filter((item, index) => {
      if (item[propName].toLowerCase()
        .search(this.state.searchParams
        .toLowerCase()) !== -1) {
        return item;
      } //console.log('didnt find matches');
    }
  ).slice(0, maxSize);

    const chosenByKey = (item, index) => {
      if (this.state.selectedItem === index) {
        return {
          'backgroundColor': defaultStyles.highlight,
          'fontWeight': 'bold',
          'borderStyle': 'solid',
          'borderWidth': '1px',
          'borderColor': defaultStyles.secondary_text,
        };
      } return { 'backgroundColor': defaultStyles.secondary_text };
    };

    const keyNavigation = (event) => {
      if (event.key === 'ArrowDown' && this.state.selectedItem < filteredList.length - 1) {
        //console.log('down');
        this.setState({
          selectedItem: this.state.selectedItem + 1,
        });
      }
      if (event.key === 'ArrowUp' && this.state.selectedItem > 0) {
        //console.log('up');
        this.setState({
          selectedItem: this.state.selectedItem - 1,
        });
      }
      if (event.key === 'Enter' && filteredList.length > 0) {
        //this.setState({ searchParams: filteredList[this.state.selectedItem][propName] });
        //this.setState({selectedItem: 0});
        this.handleEnter(filteredList[this.state.selectedItem]);
      }
    };

    const mouse = (index) => {
      this.setState({ selectedItem: index });
    };

    return (
      <div>
        <span className={styles.text}>
        {text}
        </span>
        <FieldRequired required={required} />
        <input onKeyDown={keyNavigation} type="text" name="autocomplete" className={styles.input} onChange={this.handleChange} value={this.state.searchParams} />
        <img src={closeIcon} className={styles.icon} onClick={this.format} />
        {filteredList.length !== 0 &&
          this.state.searchParams.length !== 0 &&
          filteredList[0][propName].toLowerCase() !== this.state.searchParams.toLowerCase() &&
          this.state.searching &&
          filteredList.map((item, index) =>
          <div
            key={index}
            className={`${styles.results} ${styles.input}`}
            style={chosenByKey(item, index)}
            onClick={() => this.handleClick(item)}
            onMouseOver={() => mouse(index)}>
              {item[propName]}
          </div>)
        }
        {filteredList.length === 0 && this.state.searchParams !== 0 && this.state.searching &&
          <div className={`${styles.noResults} ${styles.input}`}>
            Ei tuloksia
          </div>
        }
      </div>
    );
    /*if (returnObject && stateless) {
      console.log(this.props);
      return (
        <div>
        stateless and return object
        <input onKeyDown={keyNavigation}
          type="text"
          name="autocomplete"
          className={styles.input}
          onChange={this.handleStatelessChange}
          value={this.state.searchParams[propName]} />
          {filteredList.length !== 0 &&
            this.state.searchParams.length !== 0 &&
            filteredList[0][propName].toLowerCase() !== this.state.searchParams[propName].toLowerCase() &&
            filteredList.map((item, index) =>
            <div 
              key={index}
              className={`${styles.results} ${styles.input}`}
              style={chosenByKey(item, index)}
              onClick={() => this.handleClick(item)}
              onMouseOver={() => mouse(index)}>
                {item[propName]}
            </div>)
          }
          {filteredList.length === 0 && this.state.searchParams[propName] !== 0 &&
            <div className={`${styles.noResults} ${styles.input}`}>
              Ei tuloksia
            </div>
          }
      </div>
      );
    }*/
    /*return (
      <div>
        stateless
        <input onKeyDown={keyNavigation}
          type="text"
          name="autocomplete"
          className={styles.input}
          onChange={this.handleStatelessChange}
          value={this.state.searchParams} />
          {filteredList.length !== 0 &&
            this.state.searchParams.length !== 0 &&
            filteredList[0][propName].toLowerCase() !== this.state.searchParams.toLowerCase() &&
            filteredList.map((item, index) =>
            <div 
              key={index}
              className={`${styles.results} ${styles.input}`}
              style={chosenByKey(item, index)}
              onClick={() => this.handleClick(item)}
              onMouseOver={() => mouse(index)}>
                {item[propName]}
            </div>)
          }
          {filteredList.length === 0 && this.state.searchParams !== 0 &&
            <div className={`${styles.noResults} ${styles.input}`}>
              Ei tuloksia
            </div>
          }
      </div>
    );*/
  }
}

DomaAutocomplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  stateless: PropTypes.bool,
  returnObject: PropTypes.bool,
  takeObject: PropTypes.bool,
  propName: PropTypes.string.isRequired,
  maxSize: PropTypes.number,
  required: PropTypes.bool,
  text: PropTypes.string,
  valueIsObject: PropTypes.bool,
};

DomaAutocomplete.defaultProps = {
  maxSize: 50,
  defaultStyles: {
    primary_text: '#808080',
    secondary_text: '#e6e6e6',
    highlight: 'white',
  },
};

export default DomaAutocomplete;
