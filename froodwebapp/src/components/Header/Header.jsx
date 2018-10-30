/* eslint-disable global-require */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Dropdown,
  Button,
  Select
} from 'antd';
import screenfull from 'screenfull';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import { push } from 'react-router-redux';
// import { logoutRequest } from 'redux-base/actions'; weird bug with resolver
import { startCase } from 'lodash';
import usFlag from 'static/images/us.svg';
import cnFlag from 'static/images/cn.svg';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import ConnectedTasksMenu from './TasksMenu/TasksMenu';
import menuLinks from './menuLinks';
import styles from './Header.scss';

// temporary solution
export const logoutRequest = () => ({
  type: 'LOGOUT'
});

const mapStateToProps = state => ({
  user: state.login.user,
  commonDataLoaded: state.commonData.commonDataLoaded,
  badgeNotificationsCount: state.error.warningNotifications.length
});

const mapDispatchToProps = { logoutRequest, push };

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTitle: 'Sales',
      tasksMenuOpened: false,
      activeUrl: '/sales/orders'
    };
  }

  handleSetActiveUrl = (activeUrl) => {
    const activeTitle = startCase(activeUrl.split('/')[1]);
    const redirectToNewScreen = activeUrl.includes('new');
    this.setState({
      activeUrl,
      activeTitle
    },
    () => this.props.push(
      redirectToNewScreen
        ? { pathname: activeUrl, state: { id: 'new' } }
        : activeUrl
    ));
  }

  handleOpenFullScreen = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  }

  handleMenuOpen = () => {
    this.setState({
      tasksMenuOpened: !this.state.tasksMenuOpened
    });
  }

  render() {
    const {
      user,
      commonDataLoaded,
      badgeNotificationsCount
    } = this.props;

    const {
      activeTitle,
      activeUrl,
      tasksMenuOpened
    } = this.state;

    return (
      <header>
        <ConnectedTasksMenu
          isOpened={ tasksMenuOpened }
          handleMenuOpen={ this.handleMenuOpen }
        />
        <div className={ styles.topHeader }>
          { /* <span className={ styles.headerTitle }>FROOD</span> */ }
          <Select
            id="languages"
            defaultValue="english"
            className={ styles.languageDropdown }
            style={ {
              marginRight: !user ? '2.7rem' : 0
            } }
          >
            <Select.Option value="english">
              <img className={ styles.flag } src={ usFlag } alt="US Flag" />
              English US
            </Select.Option>
            <Select.Option value="chinese">
              <img className={ styles.flag } src={ cnFlag } alt="CN Flag" />
              Chinese
            </Select.Option>
          </Select>
          { user && user.name &&
            <div>
              <Dropdown
                id="user"
                overlay={
                  <Menu onClick={ this.props.logoutRequest }>
                    <Menu.Item>
                      Log Out
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button
                  size="large"
                  type="ghost"
                  className={ styles.profileDropdown }
                >
                  { user.name }
                </Button>
              </Dropdown>
              <FontAwesome
                className={ classnames('arrows-alt', styles.fullscreenIcon) }
                name="arrows-alt"
                onClick={ this.handleOpenFullScreen }
              />
            </div>
          }
        </div>
        { user && commonDataLoaded &&
          <div className={ styles.bottomHeader }>
            <HeaderMenu
              icon="fa-home"
              activeTitle={ activeTitle }
              activeUrl={ activeUrl }
              title="Dashboard"
              handleSetActiveUrl={ this.handleSetActiveUrl }
              links={ menuLinks.dashboard }
            />
            <HeaderMenu
              icon="fa-line-chart"
              activeTitle={ activeTitle }
              activeUrl={ activeUrl }
              title="Sales"
              handleSetActiveUrl={ this.handleSetActiveUrl }
              links={ menuLinks.sales }
            />
            <HeaderMenu
              icon="fa-barcode"
              activeTitle={ activeTitle }
              activeUrl={ activeUrl }
              title="Inventory"
              handleSetActiveUrl={ this.handleSetActiveUrl }
              links={ menuLinks.inventory }
            />
            <HeaderMenu
              icon="fa-inbox"
              activeTitle={ activeTitle }
              activeUrl={ activeUrl }
              title="Purchase"
              handleSetActiveUrl={ this.handleSetActiveUrl }
              links={ menuLinks.purchase }
            />
            <HeaderMenu
              icon="fa-cogs"
              activeTitle={ activeTitle }
              activeUrl={ activeUrl }
              title="Settings"
              handleSetActiveUrl={ this.handleSetActiveUrl }
              links={ menuLinks.settings }
            />
            <HeaderMenu
              icon="fa-question-circle"
              activeTitle={ activeTitle }
              activeUrl={ activeUrl }
              title="Help"
              handleSetActiveUrl={ this.handleSetActiveUrl }
            />
            <HeaderMenu
              icon="fa-bell"
              style={ { marginLeft: 'auto' } }
              activeTitle={ activeTitle }
              activeUrl={ activeUrl }
              handleSetActiveUrl={ this.handleSetActiveUrl }
              badge
              badgeNotificationsCount={ badgeNotificationsCount }
              title="Notifications"
              onClick={ this.handleMenuOpen }
            />
            <FontAwesome
              className={ classnames('bars', styles.mobileMenuIcon) }
              name="bars"
            />
          </div>
        }
      </header>
    );
  }
}

Header.propTypes = {
  // router
  push: PropTypes.func.isRequired,
  // props
  user: PropTypes.object,
  commonDataLoaded: PropTypes.bool.isRequired,
  badgeNotificationsCount: PropTypes.number,
  // redux-base
  logoutRequest: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
