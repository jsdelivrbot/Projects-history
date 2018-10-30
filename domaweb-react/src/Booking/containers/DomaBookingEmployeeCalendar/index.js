import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import TimelineLib from 'react-calendar-timeline';
import moment from 'moment';
import ToastrContainer from 'react-toastr-basic';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { LoadingOverlay } from 'react-overlay-loader';
import 'rc-tooltip/assets/bootstrap_white.css';
import 'react-overlay-loader/styles.css';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import { DropTarget } from 'react-dnd';
import _, { debounce } from 'lodash';

import {
  convertTimeForDatabase,
  getTimeDiff,
  addTime,
} from '../../../utils/dateUtil';
import Timeline from '../../libs/react-calendar-timeline/src/index';
import {
  loadTaskDetails,
  loadEmployeesGroup,
  itemMoved,
  TaskEdit,
  repetitionUpdateAll,
  addEmployeeItem,
  selectCalendarItem,
} from '../TimelineCalendar/actions';
import {
  GetTaskDetailsSelector,
  GetTaskTemplatesRepetitionsSelector,
  GetAvailableServicesSelector,
  GetTaskTypeServicesSelector,
  GetSpecialHolidaysSelector,
  GetTaskMoveStatus,
  GetUpdateRepetitionStatus,
  TimelineLoadingStatus,
  employeeGroupLoadingSelector,
  employeeItemLoadingSelector,
  groupItemsLoadingSelector,
  customerResourceLoadingSelector,
  groupGroupsLoadingSelector,
  percentageLoadingSelector,
  SelectedCalendarItemSelector,
 } from './selectors';
import EditTaskModal from '../Modals/EditModal';
import AddTaskModal from '../Modals/AddModal';
import TaskConfirm from '../../components/TaskConfirm/index';
import GroupTaskConfirm from '../../components/TaskConfirm/GroupTaskConfirm';
import BackgroundPainter from '../../components/BackgroundPainter/index';
import CalendarItem from '../../components/CalendarItem/index';
import styles from '../TimelineCalendar/DomaBooking-styles.scss';

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

    if (type === 'Group') {
      // if EmployeeCalendar dropTarget receives item from Group - don`t change time
      changeTime = false;
      component.handleScrollAreaClick(getClientOffset, item, changeTime);
    } else {
      changeTime = true;
      component.handleScrollAreaClick(getClientOffset, item, changeTime);
    }

    return {
      type: 'Employee',
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class DomaBookingEmployeeCalendar extends PureComponent {
  constructor(props) {
    super(props);
    const visibleTimeStart = moment().startOf('day');
    const visibleTimeEnd = moment().startOf('day').add('23', 'hours');

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
      loading: true,
      directMethod: false,
      dndValue: {},
      timelineRef: this.timeline,
      draggedItem: {},
      changeTime: true,
      calendarDragging: false,
      selectedRow: '',
      employeesGroup: this.props.employeesGroup,
      taskMoveFromGroupModal: false,
      confirmGroupItem: {},
      confirmRelatedGroupItems: [],
      confirmEmployeeItem: {},
    };
    this.updateAfterScrollEnds = debounce(this.endScrolling, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.visibleTimeStart !== nextProps.visibleTimeStart) ||
      (this.props.visibleTimeEnd !== nextProps.visibleTimeEnd)
    ) {
      this.updateAfterScrollEnds(this.props.activeLinkId, nextProps.visibleTimeStart, nextProps.visibleTimeEnd);
    }
    if (this.props.employeesGroup !== nextProps.employeesGroup) {
      // this.setState({ employeesGroup: nextProps.employeesGroup });
      this.checkEmployees(nextProps.employeesGroup);
    }
    if (this.props.selectedcalendaritem !== nextProps.selectedcalendaritem) {
      this.findRowNumber(nextProps.selectedcalendaritem);
    }
  }

  // START of booking calendar methods
  // Event hanlder for on calendar item change complete
  onChangeComplete = () => {
    console.log('task is changed');
  };

  setDragging = value => this.setState({ calendarDragging: value });

  // get visibleTimeStart & visibleTimeEnd when canvas is scroll horizontally and updateScrollCanvas method.
  // visibleTimeStart & visibleTimeEnd are pass to parent component via onTimelineScrollUpdate callback props.
  // loadEmployeesGroup action is dispatched to update employee Groups and items (tasks)
  handleCanvasScrolling = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    this.setState({
      visibleTimeStart,
      visibleTimeEnd,
      loading: true,
      scrolling: true,
    });
    this.props.onTimelineScrollUpdate(visibleTimeStart, visibleTimeEnd);
  };

  endScrolling = (id, start, end) => {
    this.setState({ scrolling: false });
    this.props.loadEmployeesGroup(id, start, end);
  };

  handleCanvasClick = (group, time, event) => {
    if (this.state.directMethod) {
      if (this.state.isDragging) {
        let startDate = convertTimeForDatabase(this.state.draggedItem.start);
        let endDate = convertTimeForDatabase(this.state.draggedItem.end);
        const duration = getTimeDiff(startDate, endDate);
        const receivedItem = _.cloneDeep(this.state.draggedItem);
        const groupCalendarGroup = _.cloneDeep(this.state.draggedItem.group);

        receivedItem.group = group;
        if (this.state.changeTime) {
          startDate = convertTimeForDatabase(time);
          endDate = addTime(startDate, duration);
          receivedItem.start = time;
          receivedItem.end = time + (this.state.draggedItem.end - this.state.draggedItem.start);
        }

        const payload = {
          employeeId: group,
          plannedStartTime: startDate,
          plannedEndTime: endDate,
        };

        if (this.state.changeTime) {
          this.setState({
            payload,
            taskMoveConfirmShow: true,
            draggedItem: receivedItem,
          });
        } else {
          this.setState({
            payload,
            draggedItem: receivedItem,
          }, () => this.openGroupConfirmModal(groupCalendarGroup));
        }
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

  // prepare data for for confirm modal from group calendar and open
  openGroupConfirmModal = (group) => {
    const groupItemIndex = this.props.groupGroups.findIndex(employeeGroup => employeeGroup.id === group);
    const employeeItemIndex = this.props.employeesGroup.findIndex(employeeItem => employeeItem.id === this.state.draggedItem.group);
    const filteredItems = this.props.groupItems.filter(employeeItem => employeeItem.group === group);
    const confirmEmployeeGroups = this.props.employeesGroup.map(employeeItem => ({
      label: employeeItem.title,
      value: employeeItem.title,
    }));
    this.setState({
      confirmGroupItem: this.props.groupGroups[groupItemIndex],
      confirmRelatedGroupItems: filteredItems,
      confirmEmployeeItem: this.props.employeesGroup[employeeItemIndex],
      confirmEmployeeGroups,
    }, () => this.setState({ taskMoveFromGroupModal: true }));
  }

  handleEmployeeDD = (selectedValue) => {
    const employeeItemIndex = this.props.employeesGroup.findIndex(employeeItem => employeeItem.title === selectedValue.value);
    const newEmployeeItem = this.props.employeesGroup[employeeItemIndex];
    this.setState({ confirmEmployeeItem: newEmployeeItem });
  }

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
    const calendarType = 'EMPLOYEE_CALENDAR';
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
    if (!this.state.changeTime && this.state.confirmEmployeeItem.id) {
      data.payload.employeeId = this.state.confirmEmployeeItem.id;
    }

    this.setState({
      taskMoveConfirmShow: false,
      taskMoveFromGroupModal: false,
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
    const calendarType = 'EMPLOYEE_CALENDAR';
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
    if (!this.state.changeTime && this.state.confirmEmployeeItem.id) {
      data.payload.employeeId = this.state.confirmEmployeeItem.id;
    }

    this.setState({
      taskMoveConfirmShow: false,
      taskMoveFromGroupModal: false,
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
    console.log(`Context Menu:  ${itemId}`);
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
  };

  // Event handler to handle item Click
  handleItemClick = (itemId) => {
    const handleItemIndex = this.props.employeesItems.findIndex(item => item.id === itemId);
    const Taskid = this.props.employeesItems[handleItemIndex].taskId;
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
      editTask={this.editTask}
      item={item}
      type="Employee"
      visibleTimeStart={this.state.visibleTimeState}
      visibleTimeEnd={this.state.visibleTimeEnd}
      activeLinkId={this.props.activeLinkId}
      selectcalendaritem={this.props.selectcalendaritem}
      selectedcalendaritem={this.props.selectedcalendaritem}
      setDragging={this.setDragging}
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
    const Calendar = document.getElementsByClassName('react-calendar-timeline')[0];
    const { topOffset, leftOffset } = this.offsetToStart(Calendar);
    // creating mouse event with correct offset to call it directly from timeline method
    const evt = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: (x - leftOffset),
      clientY: (y - topOffset),
    });
    // set draggedItem and isDragging to state to use it from onCanvasClick timeline callback method
    // set changeTime to know change time or not ( false, if dragging is between calendars )
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

  checkEmployees = (newEmployeesGroup) => {
    const employeesGroup = _.cloneDeep(newEmployeesGroup);
    const groupIndex = employeesGroup.findIndex(item => item.id === this.state.selectedRow);
    if (groupIndex !== -1) {
      employeesGroup[groupIndex].selected = true;
      this.setState({ employeesGroup });
    } else {
      this.setState({ employeesGroup: newEmployeesGroup });
    }
  }

  findRowNumber = (itemId) => {
    const itemIndex = this.props.employeesItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const groupId = this.props.employeesItems[itemIndex].group;
      const employeesGroup = _.cloneDeep(this.props.employeesGroup);
      const groupIndex = employeesGroup.findIndex(item => item.id === groupId);
      employeesGroup[groupIndex].selected = true;
      this.setState({ selectedRow: groupId, employeesGroup });
    } else {
      this.setState({ selectedRow: '', employeesGroup: this.props.employeesGroup });
    }
  }

  onFocusRow = (groupId) => {
    const employeesGroup = _.cloneDeep(this.state.employeesGroup);
    if (groupId !== this.state.focusedRow) {
      const stateIndex = employeesGroup.findIndex(item => item.id === this.state.focusedRow);
      const groupIndex = employeesGroup.findIndex(item => item.id === groupId);

      if (stateIndex !== -1) {
        if (this.state.selectedRow !== this.state.focusedRow) {
          employeesGroup[stateIndex].selected = false;
        }
      }
      if (groupIndex !== -1) {
        if (this.state.selectedRow !== groupId) {
          employeesGroup[groupIndex].selected = true;
        }
        this.setState({ focusedRow: groupId, employeesGroup });
      }
    }
  }

  onFocusOut = () => {
    const employeesGroup = _.cloneDeep(this.state.employeesGroup);
    const groupIndex = employeesGroup.findIndex(item => item.id === this.state.focusedRow);

    if (groupIndex !== -1) {
      if (this.state.selectedRow !== this.state.focusedRow) {
        employeesGroup[groupIndex].selected = false;
        this.setState({ employeesGroup, focusedRow: '' });
      }
    }
  }

  render() {
    const editModalClose = () => this.setState({ editModalShow: false });
    const addModalClose = () => this.setState({ addModalShow: false });
    const taskConfirmClose = () => this.setState({ taskMoveConfirmShow: false });
    const taskGroupConfirmClose = () => this.setState({ taskMoveFromGroupModal: false });

    const {
      connectDropTarget,
      visibleTimeStart,
      visibleTimeEnd,
    } = this.props;

    return connectDropTarget(
      <div
        style={{
          height: '50vh',
          backgroundColor: 'white',
          paddingLeft: 16,
        }}
      >
        <ToastrContainer />
        <div style={{ opacity: 0.65 }}>
          <ProgressBar autoIncrement percent={this.props.percentage || -1} />
        </div>
        <TaskConfirm
          closeModal={taskConfirmClose}
          show={this.state.taskMoveConfirmShow}
          moveSingleItem={this.moveSingleItem}
          moveRepeatedItem={this.moveRepeatedItem}
          draggedItem={this.state.draggedItem}
        />
        <GroupTaskConfirm
          closeModal={taskGroupConfirmClose}
          show={this.state.taskMoveFromGroupModal}
          moveSingleItem={this.moveSingleItem}
          moveRepeatedItem={this.moveRepeatedItem}
          draggedItem={this.state.draggedItem}
          groupItem={this.state.confirmGroupItem}
          relatedGroupItems={this.state.confirmRelatedGroupItems}
          employeeGroups={this.state.confirmEmployeeGroups}
          employeeItem={this.state.confirmEmployeeItem}
          handleEmployeeDD={this.handleEmployeeDD}
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
        { this.props.employeesGroup &&
          <AddTaskModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            employeesgroup={this.props.employeesGroup}
            employeesitems={this.props.employeesItems}
            bookingtypes={this.props.bookingTypes}
            customerresources={this.props.customerResources}
            groupgroups={this.props.groupGroups}
            groupid={this.state.groupId}
            canvasdatetime={this.state.canvasDateTime}
            activelinkid={this.props.activeLinkId}
            visibletimestart={visibleTimeStart}
            visibletimeend={visibleTimeEnd}
            type="Employee"
            availableservices={this.props.availableservices}
          />
        }
        <LoadingOverlay>
          <Timeline
            sidebarContent={<div>Employees</div>}
            sidebarWidth={180}
            groups={this.state.employeesGroup}
            items={this.props.employeesItems}
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
            ref={(r) => { this.timeline = r; }}
          >
            <BackgroundPainter activeItem={this.state.selectedRow} focusedItem={this.state.focusedRow} />
          </Timeline>
        </LoadingOverlay>
      </div>,
    );
  };
}

DomaBookingEmployeeCalendar.propTypes = {
  employeesGroup: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  employeesItems: PropTypes.oneOfType([
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
  groupGroups: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  templaterepetitions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  availableservices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  loadEmployeesGroup: PropTypes.func,
  repetitionUpdateAll: PropTypes.func,
  itemMoved: PropTypes.func,
  loadTaskDetails: PropTypes.func,
  onTimelineScrollUpdate: PropTypes.func,
  connectDropTarget: PropTypes.func,
  activeLinkId: PropTypes.string,
  percentage: PropTypes.number,
  visibleTimeStart: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  visibleTimeEnd: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  gettaskdetails: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  selectcalendaritem: PropTypes.func,
  selectedcalendaritem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  groupItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};

const mapStateToProps = createStructuredSelector({
  gettaskdetails: GetTaskDetailsSelector(),
  templaterepetitions: GetTaskTemplatesRepetitionsSelector(),
  availableservices: GetAvailableServicesSelector(),
  tasktypeservices: GetTaskTypeServicesSelector(),
  specialholidays: GetSpecialHolidaysSelector(),
  taskmovestatus: GetTaskMoveStatus(),
  isrepetitionupdated: GetUpdateRepetitionStatus(),
  istimelineloading: TimelineLoadingStatus(),
  isemployeegrouploading: employeeGroupLoadingSelector(),
  isemployeeitemloading: employeeItemLoadingSelector(),
  isgroupitemsloading: groupItemsLoadingSelector(),
  isgroupgrouploading: groupGroupsLoadingSelector(),
  iscustomerresourceloading: customerResourceLoadingSelector(),
  percentage: percentageLoadingSelector(),
  selectedcalendaritem: SelectedCalendarItemSelector(),
});

const mapDispatchToProps = dispatch => ({
  loadTaskDetails: bindActionCreators(loadTaskDetails, dispatch),
  loadEmployeesGroup: bindActionCreators(loadEmployeesGroup, dispatch),
  itemMoved: bindActionCreators(itemMoved, dispatch),
  TaskEdit: bindActionCreators(TaskEdit, dispatch),
  repetitionUpdateAll: bindActionCreators(repetitionUpdateAll, dispatch),
  showLoading: bindActionCreators(showLoading, dispatch),
  hideLoading: bindActionCreators(hideLoading, dispatch),
  showSnack: bindActionCreators(hideLoading, dispatch),
  addEmployeeItem: bindActionCreators(addEmployeeItem, dispatch),
  selectcalendaritem: bindActionCreators(selectCalendarItem, dispatch),
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(DropTarget('CALENDAR', calendarSpecs, collect)(DomaBookingEmployeeCalendar));
