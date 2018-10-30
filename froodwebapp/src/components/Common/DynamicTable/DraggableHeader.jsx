/* eslint-disable
   babel/new-cap,
   react/no-array-index-key,
   react/no-find-dom-node,
   no-param-reassign
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { SortIcon } from 'icons';
import styles from './StickyTable.scss';

const headerSource = {
  beginDrag: props => ({
    id: props.id,
    index: props.index
  })
};

const headerTarget = {
  hover: (props, monitor, component) => {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the right
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;

    // Only perform the move when the mouse has crossed half of the items width
    // When dragging left, only move when the cursor is left 50%
    // When dragging right, only move when the cursor is right 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    // time to update headers order
    props.moveHeader(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop: (props, monitor) => {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    props.saveHeaderOrder(dragIndex, hoverIndex);
  }
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

export class DraggableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: 'ASC'
    };
  }

  handleSortByColumn = () => {
    this.setState({
      sortOrder: this.state.sortOrder === 'ASC' ? 'DESC' : 'ASC'
    },
    this.props.handleSort(this.props.headerId, this.state.sortOrder)
    );
  }

  render() {
    const {
      headerText,
      headerDataType,
      index,
      isSortable,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;

    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div
        id={ `sticky-header-cell-${index + 1}` }
        className={ styles.cell }
        key={ headerText }
        style={ {
          opacity,
          cursor: 'move',
          textAlign: headerDataType.includes('decimal') ? 'right' : 'left'
        } }
      >
        { headerText }
        { isSortable &&
          <SortIcon
            onClick={ this.handleSortByColumn }
          />
        }
      </div>
    ));
  }
}

DraggableHeader.propTypes = {
  headerId: PropTypes.number.isRequired,
  headerText: PropTypes.string.isRequired,
  headerDataType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isSortable: PropTypes.bool.isRequired,
  handleSort: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

const source = DragSource('cell', headerSource, sourceCollect)(DraggableHeader);
const DragHeader = DropTarget('cell', headerTarget, targetCollect)(source);

export default DragHeader;
