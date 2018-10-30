/**
*
* DateRange
*
*/

import React from 'react'; 
 import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker';
import moment, { isMoment } from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col, Clearfix } from 'react-bootstrap';
// import styled from 'styled-components';
import styles from './daterange.scss';
import InputWithImg from '../InputWithImg';
import FieldRequired from '../FieldRequired';


class DateRange extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSinceChange = this.handleSinceChange.bind(this);
    this.handleBeforeChange = this.handleBeforeChange.bind(this);
  }

  handleSinceChange(date) {
    console.log(date);
    this.props.onSinceChange(date);
  }

  handleBeforeChange(date) {
    console.log(date);
    this.props.onBeforeChange(date);
  }
  render() {
    console.log(this);
    const { required, sinceDate, beforeDate } = this.props;
    const parseSince = sinceDate ? sinceDate : moment();
    const parseBefore = beforeDate ? beforeDate : moment();
    //const required = true;
    console.log(`since and before are ${sinceDate} ${beforeDate}`);
    console.log(sinceDate);
    console.log(beforeDate);
    return (
      <div className={styles.date_range_container}>
          {/*selected has to be a fresh moment object, displayDate a  moment().toDate() object*/}
          <span className={styles.box}>
            <b className={styles.text}>Päivämäärä</b>
            <FieldRequired required={required} />
            <DatePicker
              selected={parseSince}
              onChange={this.handleSinceChange}
              customInput={<InputWithImg displayDate={parseSince.format('LL')} />}
            />
          </span>

        <span className={styles.box}>

            <b className={styles.text}>Loppupäivämäärä</b>
            <DatePicker
              onChange={this.handleBeforeChange}
              selected={parseBefore}
              customInput={<InputWithImg displayDate={parseBefore.format('LL')} />}
            />
        </span>

      </div>
    );
  }
}

DateRange.defaultProps = {
  /*xsPull: 0,
  smPull: 0,
  mdPull: 0,
  lgPull: 0,
  xsOffset: 0,
  smOffset: 0,
  mdOffset: 0,
  lgOffset: 0,*/
};

DateRange.propTypes = {
  //range: PropTypes.func.isRequired,
};

export default DateRange;
