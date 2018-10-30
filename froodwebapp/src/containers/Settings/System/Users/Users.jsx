import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Tabs } from 'antd';
import { PageHeader } from 'components';
import { connect } from 'react-redux';
import {
  usersGetRequest,
  rolesGetRequest,
  rightsGetRequest
} from 'redux-base/actions';
import {
  ConnectedUsersTab,
  ConnectedRolesTab,
  ConnectedRightsTab
} from './Tabs';

const mapDispatchToProps = {
  usersGetRequest,
  rolesGetRequest,
  rightsGetRequest
};

const { TabPane } = Tabs;

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'users',
      activeRoleId: 0
    };
  }

  componentWillMount() {
    this.props.usersGetRequest();
  }

  handleTabClick = (activeTab, activeRoleId) => {
    this.setState({
      activeTab,
      activeRoleId
    }, () => {
      switch (activeTab) {
        case 'users':
          this.props.usersGetRequest();
          break;
        case 'roles':
          this.props.rolesGetRequest();
          break;
        case 'rights':
          this.props.rightsGetRequest();
          break;
        default:
      }
    });
  }

  render() {
    const { activeTab, activeRoleId } = this.state;

    return (
      <div>
        <PageHeader
          bigText="Manage Users, Roles & Rights"
          smallText="Add your users, roles and rights and manage their details & permissions"
        />
        <Row>
          <Col lg>
            <Tabs
              activeKey={ activeTab }
              onTabClick={ this.handleTabClick }
              animated={ false }
            >
              <TabPane
                key="users"
                tab="Users"
              >
                <ConnectedUsersTab />
              </TabPane>
              <TabPane
                key="roles"
                tab="Roles"
              >
                <ConnectedRolesTab handleTabClick={ this.handleTabClick } />
              </TabPane>
              <TabPane
                key="rights"
                tab="Rights"
              >
                <ConnectedRightsTab activeRoleId={ activeRoleId } />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

Users.propTypes = {
  // redux-base
  usersGetRequest: PropTypes.func.isRequired,
  rolesGetRequest: PropTypes.func.isRequired,
  rightsGetRequest: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Users);
