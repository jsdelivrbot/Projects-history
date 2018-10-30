import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { RefreshIcon, SettingsIcon } from 'icons';
import ColumnsModal from './ColumnsModal/ColumnsModal';
import { tabsExtraContent } from './TabsExtraContent.scss';

class TabsExtraContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsModalVisible: false
    };
  }

  handleToggleColumnsModal = () => {
    this.setState({
      columnsModalVisible: !this.state.columnsModalVisible
    });
  }

  handleUpdateDefaultColumns = (columns) => {
    const {
      limit,
      offset,
      activeTabId
    } = this.props;

    const payload = {
      columns,
      limit,
      offset
    };

    if (activeTabId !== 'All') {
      payload.filterId = activeTabId;
    }

    this.setState({
      columnsModalVisible: !this.state.columnsModalVisible
    }, () => this.props.updateColumnsRequest({ payload }));
  }

  handleRefresh = () => {
    const {
      activeTabId,
      limit,
      offset
    } = this.props;

    switch (activeTabId) {
      case 'All': {
        this.props.getAllItemsRequest({
          limit,
          offset
        });
        break;
      }
      case '+ Filter':
        break;
      default: {
        this.props.getWithFilterRequest({
          payload: {
            id: activeTabId,
            limit,
            offset
          }
        });
        break;
      }
    }
  }

  render() {
    const {
      columnsModalVisible
    } = this.state;

    const {
      columns
    } = this.props;

    return (
      <div className={ tabsExtraContent }>
        <Row around="xs">
          <Col lg>
            <RefreshIcon
              onClick={ this.handleRefresh }
            />
          </Col>
          <Col lg>
            <SettingsIcon
              onClick={ this.handleToggleColumnsModal }
            />
          </Col>
        </Row>
        <ColumnsModal
          visible={ columnsModalVisible }
          columns={ columns }
          onToggleColumnsModal={ this.handleToggleColumnsModal }
          onUpdateDefaultColumns={ this.handleUpdateDefaultColumns }
        />
      </div>
    );
  }
}

TabsExtraContent.propTypes = {
  // props
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  activeTabId: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  // redux-base
  updateColumnsRequest: PropTypes.func.isRequired,
  getWithFilterRequest: PropTypes.func.isRequired,
  getAllItemsRequest: PropTypes.func.isRequired,
};

export default TabsExtraContent;
