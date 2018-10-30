import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisibleMenu from './Sections/VisibleMenu';
import SingleMenuItem from './Sections/SingleMenuItem';
import ItemWithNestedItems from './Sections/ItemWithNestedItems';
import {
  container,
  button,
  menu
} from './HeaderMenu.scss';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false
    });
  }

  handleRedirect = (e) => {
    const activeUrl = e.target.parentNode.title || e.target.title;
    if (!activeUrl) return;

    this.setState({ menuVisible: false },
      () => this.props.handleSetActiveUrl(activeUrl));
  }

  render() {
    const {
      icon,
      title,
      style,
      links,
      activeUrl,
      activeTitle,
      onClick,
      badgeVisible = false,
      badgeNotificationsCount
    } = this.props;

    const { menuVisible } = this.state;

    return (
      <div
        role="button"
        tabIndex={ 0 }
        className={ container }
        style={ style }
        onClick={ onClick }
        onMouseOver={ this.handleShowMenu }
        onMouseOut={ this.handleHideMenu }
      >
        <button
          className={ button }
        >
          <VisibleMenu
            badgeVisible={ badgeVisible }
            activeTitle={ activeTitle }
            title={ title }
            icon={ icon }
            badgeNotificationsCount={ badgeNotificationsCount }
          />
          <div
            className={ menu }
            style={ {
              display: menuVisible ? 'block' : 'none'
            } }
          >
            { links && links.map(link =>
              (link.nestedMenu &&
              <ItemWithNestedItems
                key={ link.text }
                nestedItems={ link.nestedItems }
                text={ link.text }
                url={ link.url }
                activeUrl={ activeUrl }
                plusIconVisible={ link.plusIconVisible }
                plusIconUrl={ link.plusIconUrl }
                handleRedirect={ this.handleRedirect }
              />) ||
              <SingleMenuItem
                key={ link.text }
                text={ link.text }
                url={ link.url }
                activeUrl={ activeUrl }
                plusIconVisible={ link.plusIconVisible }
                plusIconUrl={ link.plusIconUrl }
                handleRedirect={ this.handleRedirect }
              />
            )}
          </div>
        </button>
      </div>
    );
  }
}

HeaderMenu.propTypes = {
  icon: PropTypes.string.isRequired,
  activeTitle: PropTypes.string,
  activeUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  links: PropTypes.array,
  handleSetActiveUrl: PropTypes.func,
  onClick: PropTypes.func,
  badgeNotificationsCount: PropTypes.number,
  badgeVisible: PropTypes.bool,
};

export default HeaderMenu;
