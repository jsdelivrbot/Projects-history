
import React from 'react';
import { Modal, Button, DropdownButton, MenuItem } from 'react-bootstrap';

import styles from './Settings-styles.scss';

class SettingsModal extends React.PureComponent {

  render() {
    return (
      <div>
        <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton className={styles.modal__header}>
            <Modal.Title id="contained-modal-title-lg">{this.props.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modal__content}>
            <h4 className={styles.settings__header}>Map and timeline settings</h4>
            <ul className={styles.chk__ul}>
              <li className="chk__item"><input type="checkbox" /> Employees</li>
              <li className="chk__item"><input type="checkbox" /> Name of employee</li>
              <li className="chk__item"><input type="checkbox" /> Planned tasks </li>
              <li className="chk__item"><input type="checkbox" /> Started tasks </li>
              <li className="chk__item"><input type="checkbox" /> Finished tasks </li>
              <li className="chk__item"><input type="checkbox" /> Customers </li>
              <li className="chk__item"><input type="checkbox" /> Name of customer </li>
            </ul>

            <h4 className={styles.settings__header}> Show on the timeline</h4>
            <ul className={styles.chk__ul}>
              <li className="chk__item"><input type="checkbox" /> Employees/ Customers</li>
              <li className="chk__item"><input type="checkbox" /> Groups </li>
              <li className="chk__item"><input type="checkbox" /> Canceled tasks </li>
              <li className="chk__item">
                <DropdownButton title="Time formats" className={styles.select__hrs}>
                  <MenuItem href="#24" key={1}>Show 24 hours</MenuItem>
                  <MenuItem href="#12" key={2}>12 hours</MenuItem>
                </DropdownButton>
              </li>
            </ul>

            <h4 className={styles.settings__header}> Menu </h4>
            <ul className={styles.chk__ul}>
              <li className="chk__item"><input type="checkbox" /> Menu</li>
              <li className="chk__item"><input type="checkbox" /> Booking calendars </li>
              <li className="chk__item"><input type="checkbox" /> Booking types </li>
              <li className="chk__item"><input type="checkbox" /> Marking types</li>
              <li className="chk__item"><input type="checkbox" /> Menu always opens </li>
            </ul>

            <h4 className={styles.settings__header}> Default view </h4>
            <ul className={styles.chk__ul}>
              <li className="chk__item"><input type="checkbox" /> Map view </li>
              <li className="chk__item"><input type="checkbox" /> Half view </li>
              <li className="chk__item"><input type="checkbox" /> Timeline view </li>
            </ul>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default SettingsModal;
