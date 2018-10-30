import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import styles from './CalendarItem-styles.scss';
import taskType from '../../containers/TimelineCalendar/tasktypeUtils';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    width: props.itemWidth ? `${props.itemWidth}px` : '180px',
    height: '28px',
    lineHeight: '14px',
    boxSizing: 'border-box',
    fontSize: '12px',
    color: 'white',
    textAlign: 'center',
    // background: '#FFC107',
    // background: 'rgb(234, 31, 36)',
    // border: '1px solid rgb(234, 31, 36)',
    background: '#337ab7',
    border: '1px solid #337ab7',
    zIndex: '110',
    overflow: 'hidden',
    opacity: '0.7',
  };
}

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.shape({
      item: PropTypes.object,
      type: PropTypes.string,
    }),
    isDragging: PropTypes.bool,
  }

  render() {
    const {
      isDragging,
      item,
    } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          <div>
            <div style={{ backgroundColor: taskType(item.item && item.item.itemState) }}>
              <div className={styles.task__shift}>
                <span className={styles.task__title}>{item.item && item.item.customerName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer(collect)(CustomDragLayer);
