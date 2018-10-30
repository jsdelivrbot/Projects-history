/*
 *
 * CheckLog
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectCheckLog from './selectors';
import messages from './messages';
import { Modal, Table, Checkbox } from 'react-bootstrap';
import MedHeader from '../../components/MedicationHeaderHoc';
import LogRow from '../../components/LogRow';
import Button from '../../../sharedComponents/Button';
import styles from './checkLog.scss';

const btnFrame = { marginLeft: '5px', float: 'left' };

export class CheckLog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { headerBlue, headerGreen, buttonWidth, height, buttonGrey } = this.context;
    const { toggle, show, CheckLog } = this.props;
    const { log } = CheckLog;
    return (
      <Modal show={show} onHide={() => toggle(show)}>
        <MedHeader>
          <Modal.Header>
            <Modal.Title>
              <FormattedMessage {...messages.header} />
            </Modal.Title>
          </Modal.Header>
        </MedHeader>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Actuary</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {log && log.map((item, index) =>
                <tr key={index} className={styles.row}>
                  <LogRow status={item.status}>
                    {item.date}
                  </LogRow>
                  <td >
                    {item.actuary}
                  </td>
                  <td>
                    {item.notes}
                  </td>
                </tr>
              )} 
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            styles={{ 'height': height, backgroundColor: headerBlue, ...btnFrame }}
            text={'Dispenser ready'}
          />
          <Button
            styles={{ 'height': height, backgroundColor: headerGreen, ...btnFrame }}
            text={'Dispenser checked'}
          />
          <Button styles={{ 'height': height, backgroundColor: buttonGrey }} text={'Close'} clickHandler={() => toggle(show)} />
        </Modal.Footer>
      </Modal>
    );
  }
}

CheckLog.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

CheckLog.contextTypes = {
  headerGreen: PropTypes.string,
  headerBlue: PropTypes.string,
  buttonWidth: PropTypes.string,
  height: PropTypes.string,
  buttonGrey: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  CheckLog: makeSelectCheckLog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckLog);
