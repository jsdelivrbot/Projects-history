import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  usersGetRequest,
  usersSaveRequest,
  usersUpdateRequest,
  usersDeleteRequest
} from 'redux-base/actions';
import { Row, Col } from 'react-flexbox-grid';
import { Table, Spin } from 'antd';
import { ConnectedTopFormModal, FroodSearchInput } from 'components';
import { table } from 'styles/common.scss';
import columns from './usersTabHelpers';
import fields from './modalFields';

const mapStateToProps = state => ({
  needReloadUsers: state.users.needReloadUsers,
  loadingPage: state.users.loadingPage,
  users: state.users.users,
  roles: state.users.roles,
});

const mapDispatchToProps = {
  usersGetRequest,
  usersSaveRequest,
  usersUpdateRequest,
  usersDeleteRequest
};

const newUser = {
  name: '',
  email: '',
  roleId: ''
};

export class UsersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newUser,
      searchValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // when we delete of update user
    if (nextProps.needReloadUsers) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      }, () => this.props.usersGetRequest());
    } else if (this.props.users.length !== nextProps.users.length) {
      // when we create user
      this.setState({
        modalVisible: false,
        modalData: newUser
      });
    }
  }

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newUser
    });
  }

  handleSave = (user) => {
    if (this.state.modalData.id) {
      this.props.usersUpdateRequest({
        payload: {
          id: this.state.modalData.id,
          roleId: user.roleId
        }
      });
    } else {
      this.props.usersSaveRequest({ payload: user });
    }
  }

  handleActivate = (e) => {
    const userId = e.target.id;
    const { roleId } = this.props.users.find(user => user.id === Number(userId));
    this.props.usersUpdateRequest({
      payload: {
        id: userId,
        roleId
      }
    });
  }

  handleDeactivate = (e) => {
    this.props.usersDeleteRequest({
      id: e.target.id
    });
  }

  handleEdit = (e) => {
    const userId = e.target.id;
    const {
      id,
      name,
      email,
      roleId
    } = this.props.users.find(usr => usr.id === Number(userId));

    this.setState({
      modalVisible: true,
      modalData: {
        id,
        name,
        email,
        roleId
      }
    });
  }

  handleSearchChange = (value) => {
    this.setState({
      searchValue: value
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      searchValue
    } = this.state;

    const {
      users,
      roles,
      loadingPage
    } = this.props;

    const data = users.filter(item =>
      item && item.name && item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New User"
          buttonText="New User"
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
                placeholder="Type to search users"
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

UsersTab.propTypes = {
  // trigger
  loadingPage: PropTypes.bool.isRequired,
  needReloadUsers: PropTypes.bool.isRequired,
  // data
  users: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  // redux-base
  usersGetRequest: PropTypes.func.isRequired,
  usersSaveRequest: PropTypes.func.isRequired,
  usersUpdateRequest: PropTypes.func.isRequired,
  usersDeleteRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
