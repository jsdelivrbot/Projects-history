import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import { Glyphicon, InputGroup } from 'react-bootstrap';

import styles from '../../containers/TimelineCalendar/DomaBooking-styles.scss';
import taskType from '../../containers/TimelineCalendar/tasktypeUtils';

export default class CalendarItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      item: PropTypes.object,
      type: PropTypes.string,
      itemState: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
    editTask: PropTypes.func,
    selectcalendaritem: PropTypes.func,
    selectedcalendaritem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }
  componentDidMount() {
    const refToRoot = this.refs.myRef.parentNode.parentNode.parentNode.parentNode;
    refToRoot.style.backgroundColor = taskType(this.props.item.itemState);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.item !== nextProps.item) {
      const refToRoot = this.refs.myRef.parentNode.parentNode.parentNode.parentNode;
      refToRoot.style.backgroundColor = taskType(nextProps.item.itemState);
    }
    if (this.props.selectedcalendaritem !== nextProps.selectedcalendaritem) {
      if (nextProps.selectedcalendaritem !== this.props.item.id) {
        this.setState({ selected: false });
      }
    }
  }

  selectCalendarItem = () => {
    this.setState({ selected: true });
    this.props.selectcalendaritem(this.props.item.id);
  }

  render() {
    const { item } = this.props;
    return (
      <div
        ref="myRef"
        className={this.state.selected ? styles.rct_item_selected : ''}
        onClick={this.selectCalendarItem}
      >
        <Tooltip
          placement="bottom"
          overlay={
            <div>
              <h3>{item && item.customerName}</h3>
              <p>{item && item.customerAddress}</p>
              <p>{item && item.phoneNum}</p>
              <p>{item && item.taskinfo}</p>
              <p>{item && item.taskAddInfo}</p>
              <p><FormattedDate value={(item.plannedStartTime ? item.plannedStartTime : '')} /></p>
            </div>
          }
          arrowContent={<div className="rc-tooltip-arrow-inner" />}
        >
          <div className="rct-item-content">
            <div className={styles.task__shift}>
              <span className={styles.task__title}>{item.customerName}</span>
            </div>
            <div className={styles.task__settings}>
              <span className={styles.task__settings__icon}>
                <InputGroup.Addon>
                  <Glyphicon glyph="pencil" onClick={() => this.props.editTask(item.taskId)} />
                </InputGroup.Addon>
              </span>
            </div>
          </div>
        </Tooltip>
      </div>
    );
  }
}
