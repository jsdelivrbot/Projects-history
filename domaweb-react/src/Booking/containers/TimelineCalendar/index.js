import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import SplitterLayout from 'react-splitter-layout';
import _ from 'lodash';

import TimelineHeader from '../../components/TimelineHeader/index';
import DomacareMap from '../../components/map/index';
import EmployeesList from '../../components/EmployeeList/index';
import {
  loadEmployeesGroup,
  loadEmployeesItems,
  selectCalendarItem,
} from './actions';
import {
  EmployeesGroupSelector,
  EmployeeItemsSelector,
  GroupGroupSelector,
  GroupItemsSelector,
  activeTimetabID,
  CustomerResourcesSelector,
} from './selectors';
import Spinner from '../../../sharedComponents/Spinner/index';
import DomaBookingEmployeeCalendar from '../DomaBookingEmployeeCalendar/index';
import DomaBookingGroupCalendar from '../DomaBookingGroupCalendar/index';
import styles from './DomaBooking-styles.scss';
import CustomDragLayer from '../../components/CalendarItem/CustomDragLayer';

/*
  TimeTab handles everything related to the Calendar. The TimeTab component is a container/stateful component which
  handles all states and events related to the calendar. It contains components such as Datepicker, Search, Slider,
  view change and settings
 */
export class Timetab extends React.PureComponent {
  constructor(props) {
    super(props);
    const visibleTimeStart = moment().startOf('day').valueOf();
    const visibleTimeEnd = moment().startOf('day').add(1, 'day').valueOf();

    this.state = {
      dockView: 'FULL',
      selectedEmployees: [],
      visibleTimeStart,
      visibleTimeEnd,
      itemWidth: 0,
      employeesGroup: [],
    };
    this.handleEmployeeCheckbox = this.handleEmployeeCheckbox.bind(this);
  }

  // loadEmployees on componentDidMount
  componentDidMount() {
    document.addEventListener('click', (e) => {
      const target = e &&
          e.target &&
          e.target.parentNode &&
          e.target.parentNode.parentNode &&
          e.target.parentNode.parentNode.parentNode &&
          e.target.parentNode.parentNode.parentNode.parentNode &&
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
      if (this.refs.myRef && target) {
        if (target.className === 'rct-item-content') {
          this.setState({
            itemWidth: target.parentNode.clientWidth,
          });
        } else if (target.className === 'rct-item-overflow') {
          this.setState({
            itemWidth: target.clientWidth,
          });
        }
      }
      if ((e.target.className === 'rct-cursor-line') ||
          (e.target.className === 'rct-hl-even') ||
          (e.target.className === 'rct-hl-odd')) {
        this.props.selectcalendaritem('');
      }
    });
    // load calendar items
    this.props.loadEmployeesGroup(
      this.props.activeTimetab,
      this.state.visibleTimeStart,
      this.state.visibleTimeEnd,
    );
  }

  // check if nextProps is equal to previous activeTimetabId props
  // if activeTimetabId props and nextProps ain't equal then loadEmployee
  componentWillReceiveProps(nextProps) {
    if (this.props.activeTimetab !== nextProps.activeTimetab) {
      this.props.loadEmployeesGroup(nextProps.activeTimetab);
    }
    if (this.props.employeesGroup !== nextProps.employeesGroup) {
      this.setState({ employeesGroup: nextProps.employeesGroup });
    }
    if (this.props.showSideMenu !== nextProps.showSideMenu) {
      setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 50);
    }
  }

  onTimelineScrollUpdate = (visibleTimeStart, visibleTimeEnd) => {
    if (typeof visibleTimeStart !== 'number') {
      this.setState({ visibleTimeStart: visibleTimeStart.valueOf() });
    } if (typeof visibleTimeEnd !== 'number') {
      this.setState({ visibleTimeEnd: visibleTimeEnd.valueOf() });
    } else {
      this.setState({ visibleTimeStart, visibleTimeEnd });
    }
  }

  // Get current docksize. SHOW/HIDE timeline booking side navigation basing on docksize.
  getDockSize = (view) => {
    const getSize = view;
    this.setState({ dockView: getSize });
    if (getSize === 'FULL') {
      this.props.toggleSidebar(true);
    }
    if (getSize === 'HALF' || getSize === 'THIRD') {
      this.props.toggleSidebar(false);
    }
  }

  changeZoom = (value) => {
    const newEndTime = moment(this.state.visibleTimeStart).add(value, 'hours').valueOf();

    this.setState({ visibleTimeEnd: newEndTime });
  }

  handleEmployeeCheckbox = (e) => {
    const selectedEmpId = this.state.selectedEmployees;
    if (e.target.checked) {
      selectedEmpId.push(
          e.target.id,
      );
    }
    this.setState({ selectedEmployees: selectedEmpId });
  }

  handleSearchButton = (searchWord) => {
    // filter employees group by searchWord
    const employeesGroup = _.cloneDeep(this.props.employeesGroup);
    const filteredGroups = employeesGroup.filter(group => _.includes(group.title.toLowerCase(), searchWord.toLowerCase()));
    this.setState({ employeesGroup: filteredGroups });
  }

  // Views are categorised into three: FULL, HALF, THIRD.
  // FULL view shows Calendar with 100% width.
  // HALF view shows Calendar and Map divided into 50% width each.
  // THIRD view shows Employees and Map divided into 25% and 75% respectively.
  renderSplitView = () => {
    if (this.state.dockView === 'FULL') {
      return (
        <div>
          <Row>
            <div className={styles.timelineheader__wrapper} >
              <TimelineHeader
                dockSize={this.getDockSize}
                size={this.state.dockView}
                startDate={this.state.visibleTimeStart}
                endDate={this.state.visibleTimeEnd}
                activeLinkId={this.props.activeTimetab}
                onTimelineScrollUpdate={this.onTimelineScrollUpdate}
                visibleTimeStart={this.state.visibleTimeStart}
                visibleTimeEnd={this.state.visibleTimeEnd}
                handleSearchButton={this.handleSearchButton}
                changeZoom={this.changeZoom}
              />
            </div>
          </Row>
          <Row>
            {this.props.employeesGroup && this.props.employeesItems ? (
              <SplitterLayout
                vertical
                customClassName={this.props.showSideMenu ? 'calendar1 full_calendar' : 'calendar1 collapsed_calendar'}
                percentage
                secondaryInitialSize={50}
                primaryInitialSize={50}
                id="calendar-splitter"
              >
                <DomaBookingEmployeeCalendar
                  employeesGroup={this.state.employeesGroup}
                  employeesItems={this.props.employeesItems}
                  bookingTypes={this.props.bookingTypes}
                  customerResources={this.props.customerResources}
                  groupGroups={this.props.groupGroups}
                  groupItems={this.props.groupItems}
                  onTimelineScrollUpdate={this.onTimelineScrollUpdate}
                  activeLinkId={this.props.activeTimetab}
                  visibleTimeStart={this.state.visibleTimeStart}
                  visibleTimeEnd={this.state.visibleTimeEnd}
                />
                <DomaBookingGroupCalendar
                  employeesGroup={this.state.employeesGroup}
                  groupGroups={this.props.groupGroups}
                  groupItems={this.props.groupItems}
                  visibleTimeStart={this.state.visibleTimeStart}
                  visibleTimeEnd={this.state.visibleTimeEnd}
                  onTimelineScrollUpdate={this.onTimelineScrollUpdate}
                  activeLinkId={this.props.activeTimetab}
                  bookingTypes={this.props.bookingTypes}
                  customerResources={this.props.customerResources}
                />
              </SplitterLayout>
              ) : (
                <Spinner />
              )}
          </Row>
        </div>
      );
    } else if (this.state.dockView === 'HALF') {
      return (
        <div className="row">
          <Row>
            {this.props.employeesGroup && this.props.employeesItems ? (
              <SplitterLayout >
                <SplitterLayout vertical secondaryInitialSize={250}>
                  <div>
                    <Row>
                      <div className={styles.timelineheader__wrapper}>
                        <TimelineHeader
                          dockSize={this.getDockSize}
                          size={this.state.dockView}
                          onTimelineScrollUpdate={this.onTimelineScrollUpdate}
                          visibleTimeStart={this.state.visibleTimeStart}
                          visibleTimeEnd={this.state.visibleTimeEnd}
                          handleSearchButton={this.handleSearchButton}
                          startDate={this.state.visibleTimeStart}
                          endDate={this.state.visibleTimeEnd}
                          activeLinkId={this.props.activeTimetab}
                          changeZoom={this.changeZoom}
                        />
                      </div>
                    </Row>
                    <Row>
                      <DomaBookingEmployeeCalendar
                        employeesGroup={this.state.employeesGroup}
                        employeesItems={this.props.employeesItems}
                        bookingTypes={this.props.bookingTypes}
                        customerResources={this.props.customerResources}
                        groupGroups={this.props.groupGroups}
                        groupItems={this.props.groupItems}
                        onTimelineScrollUpdate={this.onTimelineScrollUpdate}
                        activeLinkId={this.props.activeTimetab}
                        visibleTimeStart={this.state.visibleTimeStart}
                        visibleTimeEnd={this.state.visibleTimeEnd}
                      />
                    </Row>
                  </div>
                  <div>
                    <DomaBookingGroupCalendar
                      employeesGroup={this.state.employeesGroup}
                      groupGroups={this.props.groupGroups}
                      groupItems={this.props.groupItems}
                      visibleTimeStart={this.state.visibleTimeStart}
                      visibleTimeEnd={this.state.visibleTimeEnd}
                      onTimelineScrollUpdate={this.onTimelineScrollUpdate}
                      activeLinkId={this.props.activeTimetab}
                      bookingTypes={this.props.bookingTypes}
                      customerResources={this.props.customerResources}
                    />
                  </div>
                </SplitterLayout>
                <div>
                  <DomacareMap />
                </div>
              </SplitterLayout>
                ) : (
                  <Spinner />
                )}
          </Row>
        </div>
      );
    } else if (this.state.dockView === 'THIRD') {
      return (
        <Row>
          <Col md={2} style={{ minHeight: '800px', marginLeft: '15px' }}>
            <div>
              <Row>
                <div className={styles.timelineheader__wrapper__third}>
                  <TimelineHeader
                    dockSize={this.getDockSize}
                    size={this.state.dockView}
                    onTimelineScrollUpdate={this.onTimelineScrollUpdate}
                    visibleTimeStart={this.state.visibleTimeStart}
                    visibleTimeEnd={this.state.visibleTimeEnd}
                    handleSearchButton={this.handleSearchButton}
                    startDate={this.state.visibleTimeStart}
                    endDate={this.state.visibleTimeEnd}
                    activeLinkId={this.props.activeTimetab}
                    changeZoom={this.changeZoom}
                  />
                </div>
              </Row>
              <Row>
                <EmployeesList
                  employeesGroup={this.state.employeesGroup}
                  onUpdate={this.handleEmployeeCheckbox}
                />
              </Row>
            </div>
          </Col>
          <Col lg={10} md={10} xs={10} className={styles.map__wrapper}>
            <DomacareMap />
          </Col>
        </Row>
      );
    }
    return null;
  }

  render() {
    return (
      <div ref="myRef">
        {this.renderSplitView()}
        <CustomDragLayer itemWidth={this.state.itemWidth} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadEmployeesGroup: bindActionCreators(loadEmployeesGroup, dispatch),
  loadEmployeesItems: bindActionCreators(loadEmployeesItems, dispatch),
  selectcalendaritem: bindActionCreators(selectCalendarItem, dispatch),
});

const mapStateToProps = createStructuredSelector({
  employeesGroup: EmployeesGroupSelector(),
  employeesItems: EmployeeItemsSelector(),
  groupGroups: GroupGroupSelector(),
  groupItems: GroupItemsSelector(),
  activeTimetab: activeTimetabID(),
  customerResources: CustomerResourcesSelector(),
});

Timetab.propTypes = {
  activeTimetab: PropTypes.string,
  loadEmployeesGroup: PropTypes.func.isRequired,
  employeesItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  employeesGroup: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    ),
  ]),
  selectcalendaritem: PropTypes.func,
  toggleSidebar: PropTypes.func,
  bookingTypes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  customerResources: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  groupGroups: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  groupItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  showSideMenu: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timetab);
