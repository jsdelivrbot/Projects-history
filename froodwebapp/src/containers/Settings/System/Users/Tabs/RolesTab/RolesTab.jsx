import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { ConnectedTopFormModal, FroodSearchInput } from 'components';
import { connect } from 'react-redux';
import {
  rolesGetRequest,
  rolesSaveRequest,
  rolesUpdateRequest,
  rolesDeleteRequest
} from 'redux-base/actions';
import { Row, Col } from 'react-flexbox-grid';
import { table } from 'styles/common.scss';
import { columns } from './rolesTabHelpers';
import fields from './modalFields';

const mapStateToProps = state => ({
  loadingPage: state.users.loadingPage,
  needReloadRoles: state.users.needReloadRoles,
  roles: state.users.roles
});

const mapDispatchToProps = {
  rolesGetRequest,
  rolesSaveRequest,
  rolesUpdateRequest,
  rolesDeleteRequest
};

const newRole = {
  name: '',
  cloneId: ''
};

export class RolesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newRole,
      searchValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update role
    if (nextProps.needReloadRoles) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.rolesGetRequest());
      return;
    }

    // when we create role
    if (this.props.roles.length !== nextProps.roles.length) {
      this.setState({
        modalVisible: false,
        modalData: newRole
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newRole
    });
  }

  handleSave = (role) => {
    this.props.rolesSaveRequest({
      payload: role
    });
  }

  handleActivate = (e) => {
    this.props.rolesUpdateRequest({
      id: e.target.id
    });
  }

  handleDeactivate = (e) => {
    this.props.rolesDeleteRequest({
      id: e.target.id
    });
  }

  handleEdit = (e) => {
    this.props.handleTabClick('rights', e.target.id);
  }

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  }

  render() {
    const { loadingPage, roles } = this.props;
    const {
      modalVisible,
      modalData,
      searchValue
    } = this.state;

    const data = roles.filter(item =>
      item && item.name && item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Role"
          buttonText="New Role"
          handleSave={ this.handleSave }
          handleToggleModal={ this.handleToggleModal }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields(roles) }
        />
        <Spin spinning={ loadingPage }>
          <Row>
            <Col lg={ 4 }>
              <FroodSearchInput
                onChange={ this.handleSearchChange }
                placeholder="Type to search roles"
              />
            </Col>
          </Row>
          <Table
            className={ table }
            rowKey="id"
            size="small"
            columns={ columns(this.handleEdit, this.handleDeactivate, this.handleActivate) }
            dataSource={ data }
          />
        </Spin>
      </div>
    );
  }
}

RolesTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadRoles: PropTypes.bool.isRequired,
  // data
  roles: PropTypes.array.isRequired,
  // redux-base
  rolesGetRequest: PropTypes.func.isRequired,
  rolesSaveRequest: PropTypes.func.isRequired,
  rolesUpdateRequest: PropTypes.func.isRequired,
  rolesDeleteRequest: PropTypes.func.isRequired,
  // props
  handleTabClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesTab);
