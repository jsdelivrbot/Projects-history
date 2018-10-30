import React from 'react';

import { Button } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { ic_settings } from 'react-icons-kit/md/ic_settings';
import SettingsModal from './settingsModal';

import styles from './Settings-styles.scss';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { settingShow: false}
  }
  handleOpenModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }


  render() {
    let settingClose = () => this.setState({ settingShow: false });
    return (
      <div className={styles.booking__setttings}>
        <Button bsStyle="primary"
                className={styles.settings__btn}
                onClick={()=>
                this.setState({ settingShow: true })}>
          <Icon size={20} icon={ ic_settings } />    
        </Button>
        <SettingsModal
            show={this.state.settingShow}
            onHide={settingClose}
            header={this.state.modalTitle}
        />
    </div>
    );
  }

}

export default Settings;
