import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

import { loadEmployeesGroup } from '../../containers/TimelineCalendar/actions';
import Search from '../Search';
import DomaDatePicker from '../../../sharedComponents/DomaDatePicker';
import Slider from '../../components/Slider';
import DockSize from '../../components/DockSize';
import Settings from '../../components/Settings';
import styles from './TimelineHeader-styles.scss';

class TimelineHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dockView: 'FULL',
    };
  }

  // handleDocksize
  handleDockSize = (docksize) => {
    console.log('docksize in timelineheader', docksize);
    this.props.dockSize(docksize);
    this.setState({ dockView: docksize });
  };

  // datePickerHandler
  datePickerHandler = (start, end) => {
    const visibleTimeStart = moment(start).startOf('day');
    const visibleTimeEnd = moment(end).startOf('day');

    const timeLength = visibleTimeEnd.diff(visibleTimeStart, 'minutes');

    if (timeLength > 10080) {
      const WeekEndTime = visibleTimeStart.clone().add(7, 'd');
      this.props.onTimelineScrollUpdate(visibleTimeStart, WeekEndTime);
    } else if (timeLength <= 0) {
      const DayEndTime = visibleTimeStart.clone().add(1, 'd');
      this.props.onTimelineScrollUpdate(visibleTimeStart, DayEndTime);
    } else {
      this.props.onTimelineScrollUpdate(visibleTimeStart, visibleTimeEnd);
    }
  }

  renderTimelineHeader = (docksize) => {
    if (docksize === 'FULL') {
      return (
        <div>
          <Col lg={2} md={2} xs={6}>
            <Search onClick={this.props.handleSearchButton} />
          </Col>
          <Col lg={2} md={2} xs={6}>
            <DomaDatePicker
              startDate={this.props.visibleTimeStart}
              onChange={date => this.datePickerHandler(date, this.props.visibleTimeEnd)}
              className={styles.example_custom_input}
            />
          </Col>
          <Col lg={2} md={2} xs={6}>
            <div className={styles.datepicker__wrapper}>
              <DomaDatePicker
                startDate={this.props.visibleTimeEnd}
                onChange={date => this.datePickerHandler(this.props.visibleTimeStart, date)}
                minDate={moment(this.props.visibleTimeStart).add(1, 'd')}
                maxDate={moment(this.props.visibleTimeStart).add(7, 'd')}
                className={styles.example_custom_input}
              />
            </div>
          </Col>
          <Col lg={2} md={2} xs={6}>
            <Slider
              changeZoom={this.props.changeZoom}
              visibleTimeStart={this.props.visibleTimeStart}
              visibleTimeEnd={this.props.visibleTimeEnd}
            />
          </Col>
          <Col lg={2} md={2} xs={6} sm={4}>
            <DockSize triggerDockSize={this.handleDockSize} />
          </Col>
          <Col lg={1} md={1} sm={4}>
            <Settings />
          </Col>
        </div>
      );
    } else if (docksize === 'HALF') {
      return (
        <div>
          <Col lg={6} md={6} xs={12}>
            <div className={styles.half__view_search}>
              <Search onClick={this.props.handleSearchButton} />
            </div>
          </Col>
          <Col lg={3} md={3}>
            <div className={styles.half_view_datepicker}>
              <DomaDatePicker
                startDate={this.props.visibleTimeStart}
                onChange={date => this.datePickerHandler(date, this.props.visibleTimeEnd)}
                className={styles.example_custom_input}
              />
            </div>
          </Col>
          <Col lg={3} md={3}>
            <DomaDatePicker
              startDate={this.props.visibleTimeEnd}
              onChange={date => this.datePickerHandler(this.props.visibleTimeStart, date)}
              minDate={moment(this.props.visibleTimeStart).add(1, 'd')}
              maxDate={moment(this.props.visibleTimeStart).add(7, 'd')}
              className={styles.example_custom_input}
            />
          </Col>
          <Col lg={4} md={4}>
            <div className={styles.half_view_slider}>
              <Slider
                changeZoom={this.props.changeZoom}
                visibleTimeStart={this.props.visibleTimeStart}
                visibleTimeEnd={this.props.visibleTimeEnd}
              />
            </div>
          </Col>
          <Col lg={3} md={3} xs={6} sm={4}>
            <div className={styles.half_view_docker}>
              <DockSize triggerDockSize={this.handleDockSize} />
            </div>
          </Col>
          <Col lg={1} md={1} sm={4}>
            <div className={styles.half_view_settings}>
              <Settings />
            </div>
          </Col>
        </div>
      );
    } else if (docksize === 'THIRD') {
      return (
        <div className={styles.third__view__wrapper}>
          <Row>
            <Col md={12}>
              <Row>
                <Col lg={12} md={12}>
                  <div className={styles.third__view_search}>
                    <Search onClick={this.props.handleSearchButton} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6}>
                  <div className={styles.third__view_datepicker_one}>
                    <DomaDatePicker
                      startDate={this.props.visibleTimeStart}
                      onChange={date => this.datePickerHandler(date, this.props.visibleTimeEnd)}
                      className={styles.example_custom_input}
                    />
                  </div>
                </Col>
                <Col lg={6} md={6} className={styles.third__view_datepicker_two}>
                  <DomaDatePicker
                    startDate={this.props.visibleTimeEnd}
                    onChange={date => this.datePickerHandler(this.props.visibleTimeStart, date)}
                    minDate={moment(this.props.visibleTimeStart).add(1, 'd')}
                    maxDate={moment(this.props.visibleTimeStart).add(7, 'd')}
                    className={styles.example_custom_input}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} xs={6} sm={4}>
                  <div className={styles.third_view_docker}>
                    <DockSize triggerDockSize={this.handleDockSize} />
                  </div>
                </Col>
                <Col lg={2} md={2} sm={4}>
                  <div className={styles.half_view_settings}>
                    <Settings />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
    return null;
  };

  render() {
    const { size } = this.props;
    return (
      <div className={styles.timeline__header}>
        {this.renderTimelineHeader(size)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadEmployeesGroup: bindActionCreators(loadEmployeesGroup, dispatch),
});

TimelineHeader.propTypes = {
  size: PropTypes.string,
  onTimelineScrollUpdate: PropTypes.func,
  dockSize: PropTypes.func,
  handleSearchButton: PropTypes.func,
  changeZoom: PropTypes.func,
  visibleTimeStart: PropTypes.number,
  visibleTimeEnd: PropTypes.number,
};

export default connect(null, mapDispatchToProps)(TimelineHeader);
