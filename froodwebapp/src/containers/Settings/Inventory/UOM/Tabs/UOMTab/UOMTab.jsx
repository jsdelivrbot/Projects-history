import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { ConnectedTopFormModal, FroodSearchInput } from 'components';
import {
  uomGetRequest,
  uomSaveRequest,
  uomUpdateRequest,
  uomDeleteRequest
} from 'redux-base/actions';
import { table } from 'styles/common.scss';
import { Row, Col } from 'react-flexbox-grid';
import columns from './uomTabHelper';
import fields from './modalFields';

const mapStateToProps = state => ({
  uom: state.uom.data,
  loadingPage: state.uom.loadingPage,
  needReloadUOM: state.uom.needReloadUOM,
});

const mapDispatchToProps = {
  uomGetRequest,
  uomSaveRequest,
  uomUpdateRequest,
  uomDeleteRequest
};

const newUOM = {
  name: '',
  description: ''
};

export class UOMTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newUOM,
      searchValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update uom
    if (nextProps.needReloadUOM) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.uomGetRequest());
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newUOM
    });
  }

  handleSave = (data) => {
    if (this.state.modalData.id) {
      this.props.uomUpdateRequest({
        payload: {
          id: this.state.modalData.id,
          name: data.name,
          description: data.description,
        }
      });
    } else {
      this.props.uomSaveRequest({ payload: data });
    }
  }

  handleEdit = (e) => {
    this.setState({
      modalVisible: true,
      modalData: this.props.uom.find(uom => uom.id === Number(e.target.id))
    });
  }

  handleDeactivate = (e) => {
    this.props.uomDeleteRequest({
      id: e.target.id
    });
  }

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  }

  render() {
    const {
      uom,
      loadingPage
    } = this.props;

    const {
      modalVisible,
      modalData,
      searchValue
    } = this.state;

    const data = uom && uom.filter(item =>
      item && item.name && item.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New UOM"
          buttonText="New UOM"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields }
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col lg={ 4 }>
              <FroodSearchInput
                onChange={ this.handleSearchChange }
                placeholder="Type to search uoms"
              />
            </Col>
          </Row>
          <Table
            rowKey="id"
            size="small"
            className={ table }
            columns={ columns(this.handleEdit, this.handleDeactivate) }
            dataSource={ data }
          />
        </Spin>
      </div>
    );
  }
}

UOMTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadUOM: PropTypes.bool.isRequired,
  // data
  uom: PropTypes.array.isRequired,
  // redux-base
  uomGetRequest: PropTypes.func.isRequired,
  uomSaveRequest: PropTypes.func.isRequired,
  uomUpdateRequest: PropTypes.func.isRequired,
  uomDeleteRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UOMTab);
