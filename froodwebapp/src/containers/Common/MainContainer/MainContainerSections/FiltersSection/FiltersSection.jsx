import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DetailsSection from './DetailsSection/DetailsSection';
import TabsSection from './TabsSection/TabsSection';

class FilterTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSectionVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeFilterId === '+ Filter') {
      this.setState({
        searchSectionVisible: true
      });
    } else if (nextProps.activeFilterId !== this.props.activeFilterId) {
      this.setState({
        searchSectionVisible: false
      });
    }
  }


  handleToggleSearchSection = () => {
    this.setState({
      searchSectionVisible: !this.state.searchSectionVisible
    });
  }

  render() {
    const {
      limit,
      offset,
      filters,
      activeFilterId,
      columns
    } = this.props;

    const {
      searchSectionVisible
    } = this.state;

    const filterColumns = columns.filter(col => col.isFilter);
    const activeFilter = filters.find(filter => filter.id === Number(activeFilterId));

    return (
      <div>
        <TabsSection
          // data
          tabs={ filters }
          activeTabId={ activeFilterId }
          columns={ columns }
          limit={ limit }
          offset={ offset }
          // redux-base
          updateColumnsRequest={ this.props.updateColumnsRequest }
          getAllItemsRequest={ this.props.getAllItemsRequest }
          getWithFilterRequest={ this.props.getWithFilterRequest }
          changeActiveFilterId={ this.props.changeActiveFilterId }
          // Search Section Trigger
          handleToggleSearchSection={ this.handleToggleSearchSection }
        />
        { searchSectionVisible &&
          <DetailsSection
            // data
            filterColumns={ filterColumns }
            activeFilter={ activeFilter }
            // redux-base
            getWithFilterRequest={ this.props.getWithFilterRequest }
            saveFilterRequest={ this.props.saveFilterRequest }
            updateFilterRequest={ this.props.updateFilterRequest }
            deleteFilterRequest={ this.props.deleteFilterRequest }
          />
        }
      </div>
    );
  }
}

FilterTabs.propTypes = {
  // state
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  activeFilterId: PropTypes.string.isRequired,
  // data
  filters: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  // redux-base
  getAllItemsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  saveFilterRequest: PropTypes.func.isRequired,
  updateFilterRequest: PropTypes.func.isRequired,
  deleteFilterRequest: PropTypes.func.isRequired,
  updateColumnsRequest: PropTypes.func.isRequired,
  changeActiveFilterId: PropTypes.func.isRequired,
};

export default FilterTabs;
