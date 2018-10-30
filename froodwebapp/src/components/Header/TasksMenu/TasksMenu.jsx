import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { removeWarningNotification } from 'redux-base/actions';
import Tag from './Tag';
import styles from './TasksMenu.scss';

const mapStateToProps = state => ({
  user: state.login.user,
  warningNotifications: state.error.warningNotifications
});

const mapDispatchToProps = { removeWarningNotification };

export class TasksMenu extends PureComponent {
  handleSetSidebarOpen = () => {
    this.props.handleMenuOpen();
  }

  render() {
    const {
      user,
      isOpened,
      warningNotifications
    } = this.props;

    return (

      <div
        className={ styles.tasksMenu }
        style={ {
          display: isOpened && user ? 'block' : 'none'
        } }
      >
        <Card title="Warnings" style={ { minWidth: '20rem' } }>
          { warningNotifications.map(warn => (
            <Tag
              color="orange"
              id={ warn.id }
              key={ warn.id }
              onClose={ this.props.removeWarningNotification }
              closable
            >
              { warn.msg }
            </Tag>
          ))}
        </Card>
      </div>
    );
  }
}

TasksMenu.propTypes = {
  handleMenuOpen: PropTypes.func.isRequired,
  isOpened: PropTypes.bool,
  user: PropTypes.object,
  warningNotifications: PropTypes.array,
  removeWarningNotification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksMenu);
