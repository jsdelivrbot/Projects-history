import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Icon from 'react-icons-kit';
import { Col, Row, Glyphicon, Button }
  from 'react-bootstrap';
import { ic_filter_none } from 'react-icons-kit/md/ic_filter_none';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left';
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';

import styles from './DatePicker-styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

const Btn = () => {
  return (
    <div>
      <div className="input-group-btn">
        <button className="btn btn-default"><Icon size={15} icon={ic_filter_none}></Icon></button>
      </div>
    </div>
  )
}
 export class SelectDate extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
    <div>
      {/*<Col md={2}>
        <div className={styles.previous}>
          <Icon size={25} icon={ic_keyboard_arrow_left} className={styles.previous__icon}/>
        </div>
      </Col>*/}
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="MM.DD.YYYY"
            className={styles.datepicker}
            calendarClassName="rasta-stripes"
            locale="fi"
        />
      {/*<Col md={2}>
        <div className={styles.next}>
          <Icon size={25} icon={ic_keyboard_arrow_right} className={styles.next__icon}/>
        </div>
      </Col>*/}
    </div>
  )};
}

function mapStateToProps(ownProps) {
  return {
    language: ownProps.params
  };
}

export default connect(mapStateToProps)(SelectDate);
