import React from 'react';
import Icon from 'react-icons-kit';
import { FormattedMessage } from 'react-intl';

import DatePicker from '../CustomDatePicker';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left';
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';

import messages from '../../messages';

import styles from './tasksDateSelectorBar-styles.scss';
import utilities from '../../../assets/styles/utilities.scss';

function TasksDateSelectorBar(props) {
  return (
    <div className={`${styles.top_bar} ${utilities.bold}`}>
      <div className={window.matchMedia('(max-width: 1200px)').matches && props.router.params.id ? utilities.display_none : styles.previous} onClick={props.yesterdayDate}>
        <Icon size={32} icon={ic_keyboard_arrow_left} className={utilities.display_inline_block} />
        <span> {<FormattedMessage {...messages.previous} />} </span>
      </div>
      <div className={window.matchMedia('(max-width: 1200px)').matches && props.router.params.id ? utilities.display_none : styles.dateChanger}>
        <DatePicker changeDate={props.changeDate} currentDate={props.currentDate}/>
      </div>
      <div className={window.matchMedia('(max-width: 1200px)').matches && props.router.params.id ? utilities.display_none : styles.next} onClick={props.tomorrowDate}>
        {<FormattedMessage {...messages.next} />}
      <Icon size={32} icon={ic_keyboard_arrow_right} className={utilities.display_inline_block} />
      </div>
      <div className={window.matchMedia('(max-width: 1200px)').matches && props.router.params.id !== undefined ? styles.top_bar__backBttn : utilities.display_none} onClick={() => props.router.push(`/tasks/${props.currentDate}`)} >
        <Icon size={32} icon={ic_keyboard_arrow_left} className={utilities.display_inline_block} /> <span>{<FormattedMessage {...messages.backToTasks} />}</span>
      </div>
    </div>
  );
}

export default TasksDateSelectorBar;
