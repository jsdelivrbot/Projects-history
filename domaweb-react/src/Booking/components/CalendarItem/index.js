import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { bindActionCreators } from 'redux';
import CalendarItem from './CalendarItem';
import { loadEmployeesGroup } from '../../containers/TimelineCalendar/actions';

const calendarSource = {
  beginDrag(props, monitor, component) {
    const { item } = props;
    return {
      item: {
        customerAddress: item.customerAddress,
        customerName: item.customerName,
        end: item.end,
        group: item.group,
        id: item.id,
        itemState: item.itemState,
        phoneNum: item.phoneNum,
        plannedEndTime: item.plannedEndTime,
        plannedStartTime: item.plannedStartTime,
        start: item.start,
        taskAddInfo: item.taskAddInfo,
        taskId: item.taskId,
        taskinfo: item.taskinfo,
        title: item.title,
        repetitionId: item.repetitionId,
      },
      type: props.type,
    };
  },
  canDrag(props, monitor) {
    return props.item.itemState !== 'FINISHED';
  },
  // isDragging(props, monitor) {
  //   const getClientOffset = monitor.getClientOffset();
  //   console.log('getInitialClientOffset client offset: ', getClientOffset);
  // },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class DragCalendarItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    item: PropTypes.shape({
      item: PropTypes.object,
      type: PropTypes.string,
    }),
    selectcalendaritem: PropTypes.func,
    selectedcalendaritem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isDragging: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.isDragging !== nextProps.isDragging) {
  //     // this.props.setDragging(nextProps.isDragging);
  //     // console.log('nextProps.isDragging: ', nextProps.isDragging);
  //   }
  // }

  render() {
    const {
      connectDragSource,
      item,
      editTask,
      selectcalendaritem,
      selectedcalendaritem,
    } = this.props;

    return connectDragSource(
      <div>
        <CalendarItem
          item={item}
          editTask={editTask}
          selectcalendaritem={selectcalendaritem}
          selectedcalendaritem={selectedcalendaritem}
        />
      </div>,
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  loadEmployeesGroup: bindActionCreators(loadEmployeesGroup, dispatch),
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(DragSource('CALENDAR', calendarSource, collect)(DragCalendarItem));
