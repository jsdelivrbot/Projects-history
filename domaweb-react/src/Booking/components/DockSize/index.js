import React from 'react';

import { Row, Col } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { ic_check_box_outline_blank } from 'react-icons-kit/md/ic_check_box_outline_blank';
import { ic_filter_none } from 'react-icons-kit/md/ic_filter_none';
import { ic_crop_square } from 'react-icons-kit/md/ic_crop_square';
import { Button } from 'react-bootstrap';
import { ic_settings } from 'react-icons-kit/md/ic_settings';

import styles from './DockSize-styles.scss';

class DockSize extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {};
  }
  render() {

    return (
      <div>
        <div className={styles.booking__dock}>
          <Icon size={25} icon={ic_check_box_outline_blank} className={styles.dock__icon} onClick={(e) => this.props.triggerDockSize('FULL')}/>
          <Icon size={25} icon={ic_filter_none}  className={styles.dock__icon}  onClick={(e) => this.props.triggerDockSize('HALF')}/>
          <Icon size={25} icon={ic_crop_square} className={styles.dock__icon}  onClick={(e) => this.props.triggerDockSize('THIRD')}/>
        </div>
      </div>
    );
  }

}

export default DockSize;
