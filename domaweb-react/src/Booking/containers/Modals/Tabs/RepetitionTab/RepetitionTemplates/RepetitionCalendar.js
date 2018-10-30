import React, { PureComponent } from 'react';
import {
  Row,
  Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import Tooltip from 'rc-tooltip';

import styles from '../../../../TimelineCalendar/DomaBooking-styles.scss';

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

export default class RepetitionCalendar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      weeks: [],
    };
  }
  componentWillMount() {
    this.setState({ dates: this.props.dates });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dates !== nextProps.dates) {
      this.setState({ dates: nextProps.dates }, () => this.sortDates(nextProps.dates));
    }
  }

  populateEmptyFields = (sortedWeeks) => {
    const weeks = _.cloneDeep(sortedWeeks);
    const populatedWeeks = [];

    weeks.forEach((week) => {
      const populatedWeek = _.cloneDeep(week);
      if (!week.days['0']) {
        populatedWeek.days['0'] = { name: '--', isHoliday: false };
      }
      if (!week.days['1']) {
        populatedWeek.days['1'] = { name: '--', isHoliday: false };
      }
      if (!week.days['2']) {
        populatedWeek.days['2'] = { name: '--', isHoliday: false };
      }
      if (!week.days['3']) {
        populatedWeek.days['3'] = { name: '--', isHoliday: false };
      }
      if (!week.days['4']) {
        populatedWeek.days['4'] = { name: '--', isHoliday: false };
      }
      if (!week.days['5']) {
        populatedWeek.days['5'] = { name: '--', isHoliday: false };
      }
      if (!week.days['6']) {
        populatedWeek.days['6'] = { name: '--', isHoliday: false };
      }
      populatedWeeks.push(populatedWeek);
    });
    this.setState({ weeks: populatedWeeks });
  }

  sortDates = (dates) => {
    const sortedDates = _.cloneDeep(dates);
    sortedDates.sort((left, right) => moment.utc(left).diff(moment.utc(right)));

    const weeks = [];
    const allDates = this.enumerateDaysBetweenDates(sortedDates[0], sortedDates[sortedDates.length - 1]);
    allDates.forEach((date) => {
      const foundIndex = weeks.findIndex(week => week.number === date.week && week.year === date.year);
      const dateIndex = this.state.dates.findIndex(dateToShow => moment(dateToShow).format('YYYY-MM-DD') === date.stringDate);
      const holidaysIndex = this.props.specialholidays.findIndex(holidayDate => holidayDate.specialDay === date.stringDate);
      let daysDate = '--';
      let isHoliday = false;
      let holidayName = '';

      if (dateIndex !== -1) {
        daysDate = date.stringDate;
        if (holidaysIndex !== -1) {
          isHoliday = true;
          holidayName = this.props.specialholidays[holidaysIndex].description;
        }
      }
      if (foundIndex !== -1) {
        weeks[foundIndex].days[date.day] = {
          name: daysDate,
          isHoliday,
          holidayName,
        };
      } else {
        weeks.push({
          number: date.week,
          days: { [date.day]: { name: daysDate, isHoliday, holidayName } },
          year: date.year,
        });
      }
    });
    this.populateEmptyFields(weeks);
  }

  enumerateDaysBetweenDates = (startDate, endDate) => {
    const dates = [];
    const currDate = moment(startDate).subtract('1', 'day').startOf('day');
    const lastDate = moment(endDate).startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
      let year = '';
      if (currDate.week() === 1 && currDate.month() === 11) {
        const newYear = currDate.clone();
        year = newYear.add('1', 'year').year();
      } else {
        year = currDate.year();
      }

      dates.push({
        stringDate: currDate.format('YYYY-MM-DD'),
        day: currDate.day(),
        week: currDate.week(),
        year,
        month: currDate.month(),
      });
    }

    return dates;
  };

  render() {
    const { weeks } = this.state;

    return (
      <div>
        <Row>
          <h4 className={styles.task__header}>Repetition days</h4>
        </Row>
        <Row className={styles.repetitions__calendar_table}>
          <Table responsive>
            <thead>
              <tr className={styles.repetitions__calendar_row}>
                <th>Week</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, index) =>
                <tr key={index} className={styles.repetitions__calendar_row}>
                  <td>{week.number}</td>
                  <td className={week.days['1'].isHoliday ? styles.repetitions__calendar_holiday : styles.repetitions__calendar_workday}>
                    {week.days['1'].isHoliday ? (
                      <Tooltip
                        placement="top"
                        overlay={<span>{week.days['1'].holidayName}</span>}
                      >
                        <span>{week.days['1'].name}</span>
                      </Tooltip>
                    ) : week.days['1'].name}
                  </td>
                  <td className={week.days['2'].isHoliday ? styles.repetitions__calendar_holiday : styles.repetitions__calendar_workday}>
                    {week.days['2'].isHoliday ? (
                      <Tooltip
                        placement="top"
                        overlay={<span>{week.days['2'].holidayName}</span>}
                      >
                        <div>{week.days['2'].name}</div>
                      </Tooltip>) : week.days['2'].name}
                  </td>
                  <td className={week.days['3'].isHoliday ? styles.repetitions__calendar_holiday : styles.repetitions__calendar_workday}>
                    {week.days['3'].isHoliday ? (
                      <Tooltip
                        placement="top"
                        overlay={<span>{week.days['3'].holidayName}</span>}
                      >
                        <span>{week.days['3'].name}</span>
                      </Tooltip>
                    ) : week.days['3'].name}
                  </td>
                  <td className={week.days['4'].isHoliday ? styles.repetitions__calendar_holiday : styles.repetitions__calendar_workday}>
                    {week.days['4'].isHoliday ? (
                      <Tooltip
                        placement="top"
                        overlay={<span>{week.days['4'].holidayName}</span>}
                      >
                        <span>{week.days['4'].name}</span>
                      </Tooltip>) : week.days['4'].name}
                  </td>
                  <td className={week.days['5'].isHoliday ? styles.repetitions__calendar_holiday : styles.repetitions__calendar_workday}>
                    {week.days['5'].isHoliday ? (
                      <Tooltip
                        placement="top"
                        overlay={<span>{week.days['5'].holidayName}</span>}
                      >
                        <span>{week.days['5'].name}</span>
                      </Tooltip>) : week.days['5'].name}
                  </td>
                  <td className={week.days['6'].isHoliday ? styles.repetitions__calendar_holiday : styles.repetitions__calendar_workday}>
                    {week.days['6'].isHoliday ? (
                      <Tooltip
                        placement="top"
                        overlay={<span>{week.days['6'].holidayName}</span>}
                      >
                        <span>{week.days['6'].name}</span>
                      </Tooltip>) : week.days['6'].name}
                  </td>
                  <td className={week.days['0'].isHoliday ? styles.repetitions__calendar_holiday : styles.repetitions__calendar_workday}>
                    {week.days['0'].isHoliday ? (
                      <Tooltip
                        placement="top"
                        overlay={<span>{week.days['0'].holidayName}</span>}
                      >
                        <span>{week.days['0'].name}</span>
                      </Tooltip>) : week.days['0'].name}
                  </td>
                </tr>,
              )}
            </tbody>
          </Table>
        </Row>
        {/*<Row>*/}
        {/*<h4 className={styles.task__header}>Exceptions</h4>*/}
        {/*<p className={styles.repetitions_tab_row_inner}>*/}
        {/*You can add and modify exceptions in the timeline view after you have saved this booking item*/}
        {/*</p>*/}
        {/*</Row>*/}
      </div>
    );
  }
}

RepetitionCalendar.propTypes = {
  dates: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),
  specialholidays: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};
