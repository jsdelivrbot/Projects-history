import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showPdfPreview } from 'utils';
import {
  StatisticsSection,
  FiltersSection,
  AutoCompleteSection,
  TableSection,
  ConnectedTopButtons
} from './MainContainerSections';

const mapDispatchToProps = { push };

export class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsVisible: false
    };
  }

  componentWillMount() {
    this.props.getAllItemsRequest({
      limit: this.props.limit,
      offset: 0
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.downloadedItem) {
      showPdfPreview(nextProps.downloadedItem);
    }

    if (nextProps.filterDeleted) {
      this.props.getAllItemsRequest({
        limit: this.props.limit,
        offset: 0
      });
    }
  }

  handleRowClick = (rowId) => {
    const {
      data,
      getRowClickRedirectLink,
    } = this.props;

    if (getRowClickRedirectLink) {
      const itemId = isNaN(rowId) ? rowId : Number(rowId); // eslint-disable-line no-restricted-globals
      const row = data.find(item => item.id === itemId);

      const url = getRowClickRedirectLink(row);
      this.props.push({
        pathname: url,
        state: {
          id: row.id
        }
      });
    }
  }

  // Triggers
  handleToggleStats = () => {
    this.setState({ statsVisible: !this.state.statsVisible });
  }

  render() {
    const { statsVisible } = this.state;

    return (
      <div>
        <ConnectedTopButtons
          statsEnabled={ this.props.statsEnabled }
          statsVisible={ statsVisible }
          handleToggleStats={ this.handleToggleStats }
          newButtonVisible={ this.props.newButtonVisible }
          newButtonText={ this.props.newButtonText }
          newButtonLink={ this.props.newButtonLink }
        />
        { statsVisible &&
          <StatisticsSection
            getStatisticsColumns={ this.props.getStatisticsColumns(this.props.stats) }
          />
        }
        <AutoCompleteSection
        // data
          keyword={ this.props.keyword }
          autocomplete={ this.props.autocomplete }
          inputPlaceholder={ this.props.autocompletePlaceholder }
          renderItem={ this.props.renderAutocompleteItem }
          loadingAutoComplete={ this.props.loadingAutoComplete }
          // redux-base
          searchRequest={ this.props.searchRequest }
          getAllItemsRequest={ this.props.getAllItemsRequest }
        />
        <div
          style={ {
            margin: '-10px',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF'
          } }
        >
          <Spin spinning={ this.props.loadingPage }>
            <FiltersSection
              // data
              filters={ this.props.filters }
              columns={ this.props.columns }

              // state
              limit={ this.props.limit }
              offset={ this.props.offset }
              activeFilterId={ this.props.activeFilterId }

              // redux-base
              // get data
              getAllItemsRequest={ this.props.getAllItemsRequest } // get
              getWithFilterRequest={ this.props.getWithFilterRequest } // post
              // filters logic
              saveFilterRequest={ this.props.saveFilterRequest }
              deleteFilterRequest={ this.props.deleteFilterRequest }
              updateFilterRequest={ this.props.updateFilterRequest }
              changeActiveFilterId={ this.props.changeActiveFilterId }

              // update columns
              updateColumnsRequest={ this.props.updateColumnsRequest }
            />
            <TableSection
              actionColumnVisible={ this.props.actionColumnVisible } // show or not special action column
              handleRowClick={ this.handleRowClick }

              // triggers
              loadingTableData={ this.props.loadingTableData }

              // data
              data={ this.props.data }
              columns={ this.props.columns }
              totalRows={ this.props.totalRows }

              // state
              limit={ this.props.limit }
              offset={ this.props.offset }
              activeFilterId={ this.props.activeFilterId }

              // redux-base
              // get data
              getAllItemsRequest={ this.props.getAllItemsRequest } // get
              getWithFilterRequest={ this.props.getWithFilterRequest } // post
              // columns
              updateColumnsRequest={ this.props.updateColumnsRequest }
              // download item
              downloadItemRequest={ this.props.downloadItemRequest }
            />
          </Spin>
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  loadingTableData: PropTypes.bool.isRequired,
  loadingAutoComplete: PropTypes.bool.isRequired,

  // data
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  filters: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
  stats: PropTypes.object,

  // state
  keyword: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  activeFilterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filterDeleted: PropTypes.bool.isRequired,

  // autocomplete
  autocomplete: PropTypes.array.isRequired,
  autocompletePlaceholder: PropTypes.string.isRequired,
  renderAutocompleteItem: PropTypes.func.isRequired,

  // top buttons
  statsEnabled: PropTypes.bool,
  newButtonVisible: PropTypes.bool,
  newButtonText: PropTypes.string,
  newButtonLink: PropTypes.string,

  // table
  actionColumnVisible: PropTypes.bool.isRequired,
  getRowClickRedirectLink: PropTypes.func,

  // helpers
  getStatisticsColumns: PropTypes.func,

  // redux-base
  // get data
  getAllItemsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  // filters
  saveFilterRequest: PropTypes.func.isRequired,
  deleteFilterRequest: PropTypes.func.isRequired,
  updateFilterRequest: PropTypes.func.isRequired,
  changeActiveFilterId: PropTypes.func.isRequired,
  // autocomplete
  searchRequest: PropTypes.func.isRequired,
  // update columns
  updateColumnsRequest: PropTypes.func.isRequired,
  // item download request
  downloadItemRequest: PropTypes.func,

  // optional
  downloadedItem: PropTypes.object,

  // router
  push: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MainContainer);
