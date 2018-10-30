import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { AutoComplete } from 'components';
import {
  autocompleteSection,
  searchIcon,
  closeIcon
} from './AutoCompleteSection.scss';

class AutoCompleteSection extends Component {
  handleSearch = (e, value) => {
    this.props.searchRequest({
      payload: value
    });
  }

  handleSelect = (id) => {
    this.props.getAllItemsRequest({
      id,
      limit: 40,
      offset: 0
    });
  }

  handleCloseResultsModal = () => {
    this.props.searchRequest({
      payload: ''
    });
  }

  render() {
    const {
      renderItem,
      inputPlaceholder,
      loadingAutoComplete,
      autocomplete,
      keyword
    } = this.props;

    return (
      <Row style={ { margin: 0 } }>
        <Col xs sm={ 7 } md={ 5 } lg={ 4 }>
          <Row
            middle="xs"
            style={ { borderBottom: keyword && '1px solid lightgrey' } }
            className={ autocompleteSection }
          >
            <Icon
              className={ searchIcon }
              type="search"
            />
            <Col xs sm md lg>
              <AutoComplete
                items={ autocomplete }
                getItemValue={ item => item.id.toString() }
                onChange={ this.handleSearch }
                onSelect={ this.handleSelect }
                value={ keyword }
                renderItem={ renderItem }
                loadingAutoComplete={ loadingAutoComplete }
                inputStyle={ {
                  fontSize: '1rem',
                  visibility: keyword && 'visible',
                  border: 'none',
                  backgroundColor: 'transparent'
                } }
                inputPlaceholder={ inputPlaceholder }
              />
            </Col>
            <Icon
              className={ closeIcon }
              type="close"
              onClick={ this.handleCloseResultsModal }
            />
          </Row>
        </Col>
      </Row>

    );
  }
}

AutoCompleteSection.propTypes = {
  loadingAutoComplete: PropTypes.bool.isRequired,
  renderItem: PropTypes.func.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  autocomplete: PropTypes.array.isRequired,
  keyword: PropTypes.string.isRequired,
  searchRequest: PropTypes.func.isRequired,
  getAllItemsRequest: PropTypes.func.isRequired
};

export default AutoCompleteSection;
