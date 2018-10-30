import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import immutable from 'immutable';
import { bindActionCreators } from 'redux';

import { messageDismiss } from '../../ErrorContainer/actions';
import notifyBg from './notifyBg';

import styles from './Snackbar-styles.scss';

class Snackbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSnackBar: this.props.notificationstatus,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { showSnackBar } = this.state;
    if (showSnackBar !== nextProps.notificationstatus) {
      this.setState({
        showSnackBar: nextProps.notificationstatus,
      });
    }
  }
  closeSnackbar = () => {
    this.props.messageDismiss();
    this.setState({ showSnackBar: false })
  }
  render() {
    const { message, notifytype, statuscode, notificationstatus, description, timeout } = this.props;
    const { showSnackBar } = this.state;

    const renderNotify = () => (
      <div>
        <div className={styles.snackbar} style={{ backgroundColor: notifyBg(notifytype)}} >
          <div className={styles.snackbar__message}>
            <p>{statuscode ? <i>{statuscode}:</i> : null} {message}</p>
          </div>
          <div className={styles.snackbar__action}>
            <span className={styles.snackbar__btn}><a onClick={this.closeSnackbar}>CLOSE</a></span>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        {(showSnackBar && !this.props.errorstatus && !this.props.loginstatus) ?
          renderNotify()
          :
          null
        }
      </div>
    );
  }
}

Snackbar.propTypes = {
  message: PropTypes.object,
  notifytype: PropTypes.string,
  statuscode: PropTypes.string,
  notificationstatus: PropTypes.oneOf([true, false]),
  description: PropTypes.string,
  timeout: PropTypes.number,
  errorstatus: PropTypes.oneOf([true, false]),
  loginstatus: PropTypes.oneOf([true, false]),
};


const mapDispatchToProps = (dispatch) => {
  return {
    messageDismiss: bindActionCreators(messageDismiss, dispatch),
  }
}

function mapStateToProps(state) {
  const normalizedNotificationState = state.get('notifications', immutable.Map()).toJS();
  const normalizedErrorState = state.get('errors', immutable.Map()).toJS();
  const normalizedLoginState = state.get('login', immutable.Map()).toJS();
  return {
    message: normalizedNotificationState.message,
    notifytype: normalizedNotificationState.notifytype,
    statuscode: normalizedNotificationState.statuscode,
    notificationstatus: normalizedNotificationState.show,
    description: normalizedNotificationState.explanation,
    timeout: normalizedNotificationState.timer,
    errorstatus: normalizedErrorState.show,
    loginstatus: normalizedLoginState.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
