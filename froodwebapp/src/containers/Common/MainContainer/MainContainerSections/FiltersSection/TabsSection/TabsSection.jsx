import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { FilterIcon } from 'icons';
import TabsExtraContent from './TabsExtraContent/TabsExtraContent';
import styles from './TabsSection.scss';

const { TabPane } = Tabs;

class TabsSection extends Component {
  handleTabChange = (tabId) => {
    const { limit } = this.props;

    switch (tabId) {
      case '+ Filter':
        this.props.changeActiveFilterId({
          payload: {
            id: tabId
          }
        });
        break;
      case 'All': {
        this.props.getAllItemsRequest({
          limit,
          offset: 0
        });
        break;
      }
      default: {
        this.props.getWithFilterRequest({
          payload: {
            id: tabId,
            limit,
            offset: 0
          }
        });
        break;
      }
    }
  }

  render() {
    const {
      activeTabId,
      tabs,
      columns,
      limit,
      offset
    } = this.props;

    const tabsExtraContent = (
      <TabsExtraContent
        activeTabId={ activeTabId }
        limit={ limit }
        offset={ offset }
        columns={ columns }
        updateColumnsRequest={ this.props.updateColumnsRequest }
        getAllItemsRequest={ this.props.getAllItemsRequest }
        getWithFilterRequest={ this.props.getWithFilterRequest }
      />
    );

    return (
      <Tabs
        className={ styles.tabs }
        activeKey={ activeTabId }
        type="card"
        onChange={ this.handleTabChange }
        tabBarExtraContent={ tabsExtraContent }
      >
        <TabPane
          key="All"
          tab="All"
        />
        { tabs.map(tab => (
          <TabPane
            key={ tab.id }
            tab={
              <div>
                { tab.name }
                { tab.userDefined &&
                  <FilterIcon
                    id={ tab.id }
                    onClick={ this.props.handleToggleSearchSection }
                  />
                }
              </div>
            }
          />
        ))}
        <TabPane
          key="+ Filter"
          tab="+ Filter"
        />
      </Tabs>
    );
  }
}

TabsSection.propTypes = {
  // data
  activeTabId: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  // redux-base
  getAllItemsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  updateColumnsRequest: PropTypes.func.isRequired,
  changeActiveFilterId: PropTypes.func.isRequired,
  // handlers
  handleToggleSearchSection: PropTypes.func.isRequired,
};

export default TabsSection;
