import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect as reduxConnect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { LoadingOverlay } from 'react-overlay-loader';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import _, { debounce } from 'lodash';

import {
  convertTimeForDatabase,
  getTimeDiff,
  addTime,
} from '../../../utils/dateUtil';
import Timeline from '../../libs/react-calendar-timeline/src/index';
import Spinner from '../../../sharedComponents/Spinner/index';
import {
  TimelineLoadingStatus,
  GetTaskDetailsSelector,
  GetTaskTemplatesRepetitionsSelector,
  GetAvailableServicesSelector,
  GetTaskTypeServicesSelector,
  GetSpecialHolidaysSelector,
  SelectedCalendarItemSelector,
} from '../DomaBookingEmployeeCalendar/selectors';
import CalendarItem from '../../components/CalendarItem/index';
import {
  addGroupItem,
  itemMoved,
  repetitionUpdateAll,
  loadTaskDetails,
  loadEmployeesGroup,
  selectCalendarItem,
} from '../TimelineCalendar/actions';
import TaskConfirm from '../../components/TaskConfirm/index';
import EditTaskModal from '../Modals/EditModal';
import AddTaskModal from '../Modals/AddModal';
import styles from '../TimelineCalendar/DomaBooking-styles.scss';
import BackgroundPainter from '../../components/BackgroundPainter';

// Set initialise default keys for the Timeline Calendar
const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
};

const calendarSpecs = {
  drop(props, monitor, component) {
    const item = monitor.getItem().item;
    const type = monitor.getItem().type;
    const getClientOffset = monitor.getClientOffset();
    let changeTime = false;

    if (type === 'Employee') {
      // if GroupCalendar dropTarget receives item from Employee - don`t change time
      changeTime = false;
      component.handleScrollAreaClick(getClientOffset, item, changeTime);
    } else {
      changeTime = true;
      component.handleScrollAreaClick(getClientOffset, item, changeTime);
    }

    return {
      type: 'Group',
    };
  },
  canDrop(props, monitor) {
    return monitor.getItem().type !== 'Employee';
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class DomaBookingGroupCalendar extends PureComponent {
  constructor(props) {
    super(props);
    const visibleTimeStart = moment().startOf('day').valueOf();
    const visibleTimeEnd = moment().startOf('day').add(1, 'day').valueOf();

    this.state = {
      edittaskid: null,
      movingTaskId: null,
      editModalShow: false,
      addModalShow: false,
      visibleTimeStart,
      visibleTimeEnd,
      groupId: null,
      addTaskTime: null,
      taskMoveConfirmShow: false,
      moveItemPayload: null,
      repetitionId: null,
      taskTemplateId: null,
      directMethod: false,
      dndValue: {},
      timelineRef: this.timeline,
      draggedItem: {},
      changeTime: true,
      scrolling: false,
      selectedRow: '',
      groupGroups: this.props.groupGroups,
    };
    this.updateAfterScrollEnds = debounce(this.endScrolling, 500);
  }
  componentWillReceiveProps(nextProps) {
    if (
        (this.props.visibleTimeStart !== nextProps.visibleTimeStart) ||
        (this.props.visibleTimeStart !== nextProps.visibleTimeStart)
    ) {
      this.updateAfterScrollEnds();
    }
    if (this.props.groupGroups !== nextProps.groupGroups) {
      // this.setState({ groupGroups: nextProps.groupGroups });
      this.checkGroups(nextProps.groupGroups);
    }
    if (this.props.selectedcalendaritem !== nextProps.selectedcalendaritem) {
      this.findRowNumber(nextProps.selectedcalendaritem);
    }
  }
  // START of booking calendar methods

  // Event hanlder for on calendar item change complete
  onChangeComplete = () => {
    console.log('task changed completed');
  };

  handleCanvasScrolling = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    this.setState({
      visibleTimeStart,
      visibleTimeEnd,
      loading: true,
      scrolling: true,
    });

    this.props.onTimelineScrollUpdate(visibleTimeStart, visibleTimeEnd);
  };

  endScrolling = () => this.setState({ scrolling: false });

  handleCanvasClick = (group, time, event) => {
    if (this.state.directMethod) {
      if (this.state.isDragging) {
        let startDate = convertTimeForDatabase(this.state.draggedItem.start);
        let endDate = convertTimeForDatabase(this.state.draggedItem.end);
        const duration = getTimeDiff(startDate, endDate);
        const receivedItem = _.cloneDeep(this.state.draggedItem);
        receivedItem.group = group;
        if (this.state.changeTime) {
          startDate = convertTimeForDatabase(time);
          endDate = addTime(startDate, duration);
          receivedItem.start = time;
          receivedItem.end = time + (this.state.draggedItem.end - this.state.draggedItem.start);
        }

        const payload = {
          taskGroupId: group,
          plannedStartTime: startDate,
          plannedEndTime: endDate,
        };

        this.setState({
          payload,
          taskMoveConfirmShow: true,
          draggedItem: receivedItem,
        });
      }
      this.setState({ directMethod: false });
    } else if (!this.state.scrolling) {
      if (this.props.selectedcalendaritem === '') {
        if ((event.target.className !== 'rct-label-group') && (event.target.className.replace(/ .*/, '') !== 'rct-label')) {
          this.setState({
            addModalShow: true,
            groupId: group,
            canvasDateTime: new Date(time),
          });
        }
      } else {
        this.props.selectcalendaritem('');
      }
    }
  };

  moveSingleItem = () => {
    const {
      draggedItem,
      payload,
      changeTime,
      visibleTimeStart,
      visibleTimeEnd,
    } = this.state;
    const startDate = convertTimeForDatabase(visibleTimeStart);
    const endDate = convertTimeForDatabase(visibleTimeEnd);
    const calendarType = 'GROUP_CALENDAR';
    const getPayload = {
      id: this.props.activeLinkId,
      visibleTimeStart: startDate,
      visibleTimeEnd: endDate,
    };
    const data = {
      id: draggedItem.taskId,
      payload,
      getPayload,
      changeTime,
      calendarType,
      item: draggedItem,
    };

    this.setState({
      taskMoveConfirmShow: false,
      isDragging: false,
      changeTime: true,
    }, () => this.props.itemMoved(data));
  };

  moveRepeatedItem = () => {
    const {
      draggedItem,
      payload,
      changeTime,
      visibleTimeStart,
      visibleTimeEnd,
    } = this.state;
    const startDate = convertTimeForDatabase(visibleTimeStart);
    const endDate = convertTimeForDatabase(visibleTimeEnd);
    const calendarType = 'GROUP_CALENDAR';
    const getPayload = {
      id: this.props.activeLinkId,
      visibleTimeStart: startDate,
      visibleTimeEnd: endDate,
    };
    const data = {
      id: draggedItem.taskId,
      payload,
      getPayload,
      changeTime,
      calendarType,
      item: draggedItem,
    };
    this.setState({
      taskMoveConfirmShow: false,
      isDragging: false,
      changeTime: true,
    }, () => this.props.repetitionUpdateAll(data));
  };

  // Event hanlder for on calendar canvas context menu
  handleCanvasContextMenu = (group, time, e) => {
    console.log('Canvas context menu', group, time);
  };

  // Event hanlder for on calendar item Context menu
  handleItemContextMenu = (itemId) => {
    console.log(`Context Menu: ${itemId}`);
  };

  // Event handler for calender item resize
  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;
    this.setState({
      items: items.map(item => (item.id === itemId ? Object.assign({}, item, {
        start: edge === 'left' ? time : item.start,
        end: edge === 'left' ? item.end : time,
      }) : item)),
    });
    console.log('Resized', itemId, time, edge);
  };

  // Event handler to handle item Click
  handleItemClick = (itemId) => {
    const handleItemIndex = this.props.groupItems.findIndex(item => item.id === itemId);
    const Taskid = this.props.groupItems[handleItemIndex].taskId;
    this.props.loadTaskDetails(Taskid);
    this.setState({ editModalShow: true, edittaskid: Taskid, loading: true });
  };

  // Event handler for validating moving resizer
  moveResizeValidator = (action, item, time, resizeEdge) => {
    if (time < new Date().getTime()) {
      return Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000);
    }
    return time;
  };

  // editTask handler takes id as an argument and pass to loadTaskDetails action
  // to get editTask details. editModalShow is set to true with extra edittaskid
  // property
  editTask = (id) => {
    this.props.loadTaskDetails(id);
    this.setState({ editModalShow: true, edittaskid: id });
  };

  // empClick handler takes empId
  // on FULL view handler will show modal to modify employee details
  // on HALF view handler will show tasks locations assign to employee on the map
  empClick = (empId) => {
    console.log(empId);
  };

  // itemRenderer method helps to render individual task box with modified UI and Tooltip
  itemRenderer = ({ item }) =>
    <CalendarItem
      item={item}
      editTask={this.editTask}
      type="Group"
      selectcalendaritem={this.props.selectcalendaritem}
      selectedcalendaritem={this.props.selectedcalendaritem}
    />;

  // Helper method to customise groups/employees UI(s) and actions
  groupRenderer = ({ group }) =>
    <div
      className={group.selected ? styles.calendar_group_selected : ''}
      onMouseEnter={() => this.onFocusRow(group.id)}
      onMouseLeave={this.onFocusOut}
    >
      <a className={styles.calendar_group_link} onClick={() => this.empClick(group.id)}>
        <span className="title" style={{ color: `${group.color}` }}>
          {group.title}
        </span>
      </a>
    </div>;

  offsetToStart = (el) => {
    const rect = el.getBoundingClientRect();
    const AbsoluteElementLeft = 180;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      topOffset: rect.top + scrollTop,
      leftOffset: AbsoluteElementLeft + rect.left + scrollLeft,
    };
  };

  handleScrollAreaClick = ({ x, y }, item, changeTime) => {
    const Calendar = document.getElementsByClassName('react-calendar-timeline')[1];
    const { topOffset, leftOffset } = this.offsetToStart(Calendar);
    // creating mouse event with correct offset to call it d
    // irectly from timeline method
    const evt = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: (x - leftOffset),
      clientY: (y - topOffset),
    });
    // set draggedItem and isDragging to state to use it from onCanvasClick timeline callback method
    // set needness of changing time or not ( false if dragging is between calendars )
    // set directMethod to true to divide simulated click of dnd and user click
    if (this.timeline) {
      this.setState({
        draggedItem: item,
        changeTime,
        directMethod: true,
        isDragging: true,
      }, () => this.timeline.scrollAreaClick(evt, true));
    }
  };

  checkGroups = (newGroupGroups) => {
    const groupGroups = _.cloneDeep(newGroupGroups);
    const groupIndex = groupGroups.findIndex(item => item.id === this.state.selectedRow);
    if (groupIndex !== -1) {
      groupGroups[groupIndex].selected = true;
      this.setState({ groupGroups });
    } else {
      this.setState({ groupGroups: newGroupGroups });
    }
  }

  findRowNumber = (itemId) => {
    const itemIndex = this.props.groupItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const groupId = this.props.groupItems[itemIndex].group;
      const groupGroups = _.cloneDeep(this.props.groupGroups);
      const groupIndex = groupGroups.findIndex(item => item.id === groupId);
      groupGroups[groupIndex].selected = true;
      this.setState({ selectedRow: groupId, groupGroups });
    } else {
      this.setState({ selectedRow: '', groupGroups: this.props.groupGroups });
    }
  }

  onFocusRow = (groupId) => {
    const groupGroups = _.cloneDeep(this.state.groupGroups);
    if (groupId !== this.state.focusedRow) {
      const stateIndex = groupGroups.findIndex(item => item.id === this.state.focusedRow);
      const groupIndex = groupGroups.findIndex(item => item.id === groupId);

      if (stateIndex !== -1) {
        if (this.state.selectedRow !== this.state.focusedRow) {
          groupGroups[stateIndex].selected = false;
        }
      }
      if (groupIndex !== -1) {
        if (this.state.selectedRow !== groupId) {
          groupGroups[groupIndex].selected = true;
        }
        this.setState({ focusedRow: groupId, groupGroups });
      }
    }
  }

  onFocusOut = () => {
    const groupGroups = _.cloneDeep(this.state.groupGroups);
    const groupIndex = groupGroups.findIndex(item => item.id === this.state.focusedRow);

    if (groupGroups !== -1) {
      if (this.state.selectedRow !== this.state.focusedRow) {
        groupGroups[groupIndex].selected = false;
        this.setState({ groupGroups, focusedRow: '' });
      }
    }
  }

  render() {
    const {
      istimelineloading,
      connectDropTarget,
      visibleTimeStart,
      visibleTimeEnd,
    } = this.props;
    const taskConfirmClose = () => this.setState({ taskMoveConfirmShow: false });
    const editModalClose = () => this.setState({ editModalShow: false });
    const addModalClose = () => this.setState({ addModalShow: false });

    return connectDropTarget(
      <div
        style={{
          backgroundColor: 'white',
          paddingLeft: 16,
          marginBottom: '25px',
        }}
      >
        <TaskConfirm
          closeModal={taskConfirmClose}
          show={this.state.taskMoveConfirmShow}
          moveSingleItem={this.moveSingleItem}
          moveRepeatedItem={this.moveRepeatedItem}
          draggedItem={this.state.draggedItem}
        />
        <EditTaskModal
          show={this.state.editModalShow}
          onHide={editModalClose}
          header={this.state.modalTitle}
          employeesgroup={this.props.employeesGroup}
          bookingtypes={this.props.bookingTypes}
          customerresources={this.props.customerResources}
          groupgroups={this.props.groupGroups}
          taskstatus={this.state.taskStatus}
          edittaskid={this.state.edittaskid}
          taskdetails={this.props.gettaskdetails}
          templaterepetitions={this.props.templaterepetitions}
          availableservices={this.props.availableservices}
          activelinkid={this.props.activeLinkId}
          visibletimestart={visibleTimeStart}
          visibletimeend={visibleTimeEnd}
        />
        { this.props.groupGroups &&
        <AddTaskModal
          show={this.state.addModalShow}
          onHide={addModalClose}
          employeesgroup={this.props.employeesGroup}
          bookingtypes={this.props.bookingTypes}
          customerresources={this.props.customerResources}
          groupgroups={this.props.groupGroups}
          groupid={this.state.groupId}
          canvasdatetime={this.state.canvasDateTime}
          activelinkid={this.props.activeLinkId}
          visibletimestart={visibleTimeStart}
          visibletimeend={visibleTimeEnd}
          type="Group"
          availableservices={this.props.availableservices}
        />
        }
        <LoadingOverlay>
          <Timeline
            sidebarContent={<div>Groups</div>}
            sidebarWidth={180}
            groups={this.state.groupGroups}
            items={this.props.groupItems}
            keys={keys}
            fixedHeader="sticky"
            fullUpdate
            canMove={false}
            canSelect
            zoom
            options
            stackItems
            itemsSorted
            showCursorLine
            itemHeightRatio={0.70}
            minResizeWidth={80}
            onItemClick={this.handleItemClick}
            minZoom={3 * 60 * 60 * 1000}
            maxZoom={24 * 7 * 60 * 60 * 1000}
            onCanvasClick={this.handleCanvasClick}
            onCanvasContextMenu={this.handleCanvasContextMenu}
            onItemContextMenu={this.handleItemContextMenu}
            onItemResize={this.handleItemResize}
            moveResizeValidator={this.moveResizeValidator}
            itemRenderer={this.itemRenderer}
            groupRenderer={this.groupRenderer}
            lineHeight={40}
            onTimeChange={this.handleCanvasScrolling}
            visibleTimeStart={visibleTimeStart}
            visibleTimeEnd={visibleTimeEnd}
            defaultTimeStart={moment().add(-12, 'hour')}
            defaultTimeEnd={moment().add(12, 'hour')}
            ref={(r) => { this.timeline = r; }}
          >
            <BackgroundPainter activeItem={this.state.selectedRow} focusedItem={this.state.focusedRow} />
          </Timeline>
          {istimelineloading ? <Spinner /> : null}
        </LoadingOverlay>
      </div>,
    );
  }
}

DomaBookingGroupCalendar.propTypes = {
  groupGroups: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  groupItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  availableservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  itemMoved: PropTypes.func,
  loadTaskDetails: PropTypes.func,
  onTimelineScrollUpdate: PropTypes.func,
  connectDropTarget: PropTypes.func,
  repetitionUpdateAll: PropTypes.func,
  istimelineloading: PropTypes.bool,
  visibleTimeStart: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  visibleTimeEnd: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  activeLinkId: PropTypes.string,
  gettaskdetails: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  templaterepetitions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),

  customerResources: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  bookingTypes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  employeesGroup: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  selectcalendaritem: PropTypes.func,
  selectedcalendaritem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const mapDispatchToProps = dispatch => ({
  addGroupItem: bindActionCreators(addGroupItem, dispatch),
  itemMoved: bindActionCreators(itemMoved, dispatch),
  repetitionUpdateAll: bindActionCreators(repetitionUpdateAll, dispatch),
  loadTaskDetails: bindActionCreators(loadTaskDetails, dispatch),
  loadEmployeesGroup: bindActionCreators(loadEmployeesGroup, dispatch),
  selectcalendaritem: bindActionCreators(selectCalendarItem, dispatch),
});

const mapStateToProps = createStructuredSelector({
  istimelineloading: TimelineLoadingStatus(),
  gettaskdetails: GetTaskDetailsSelector(),
  templaterepetitions: GetTaskTemplatesRepetitionsSelector(),
  availableservices: GetAvailableServicesSelector(),
  tasktypeservices: GetTaskTypeServicesSelector(),
  specialholidays: GetSpecialHolidaysSelector(),
  selectedcalendaritem: SelectedCalendarItemSelector(),
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(DropTarget('CALENDAR', calendarSpecs, collect)(DomaBookingGroupCalendar));
