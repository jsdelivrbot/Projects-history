import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import {
  iconContainer,
  nestedMenuContainer,
  nestedMenuItemsContainer,
  nestedMenuItem,
  caretIcon
} from '../HeaderMenu.scss';

class ItemWithNestedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }

  handleShowNestedMenu = () => {
    this.setState({
      menuVisible: true
    });
  }

  handleHideNestedMenu = () => {
    this.setState({
      menuVisible: false
    });
  }

  render() {
    const { menuVisible } = this.state;

    const {
      nestedItems,
      text,
      url,
      activeUrl,
      plusIconVisible,
      plusIconUrl,
      handleRedirect
    } = this.props;

    return (
      <div
        role="button"
        tabIndex={ 0 }
        key={ text }
        title={ url }
        className={ nestedMenuContainer }
        onClick={ handleRedirect }
        onMouseEnter={ this.handleShowNestedMenu }
        onMouseLeave={ this.handleHideNestedMenu }
      >
        { text }
        <div
          className={ iconContainer }
        >
          { plusIconVisible &&
            <Icon
              title={ plusIconUrl }
              type="plus"
              onClick={ this.handleRedirect }
            />
          }
          <FontAwesome
            className={ classnames('fa-caret-right', caretIcon) }
            name="fa-caret-right"
          />
        </div>
        <div
          className={ nestedMenuItemsContainer }
          style={ { display: menuVisible ? 'block' : 'none' } }
        >
          { nestedItems.map(nlink => (
            <div
              role="button"
              tabIndex={ 0 }
              key={ nlink.text }
              title={ nlink.url }
              onClick={ handleRedirect }
              className={ nestedMenuItem }
              style={ {
                backgroundColor: activeUrl === nlink.url ? 'antiquewhite' : 'white'
              } }
            >
              { nlink.text }
              <div
                className={ iconContainer }
              >
                { nlink.plusIconVisible &&
                  <Icon
                    title={ nlink.plusIconUrl }
                    type="plus"
                    onClick={ this.handleRedirect }
                  />
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ItemWithNestedItems.propTypes = {
  nestedItems: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  plusIconVisible: PropTypes.bool,
  plusIconUrl: PropTypes.string,
  activeUrl: PropTypes.string.isRequired,
  handleRedirect: PropTypes.func.isRequired
};

export default ItemWithNestedItems;
