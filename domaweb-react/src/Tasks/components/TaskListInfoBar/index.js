import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './tasksListInfoBar-styles.scss';
import utilites from '../../../assets/styles/utilities.scss';
import messages from '../../messages';

const TaskListInfoBar = props =>
   (
     <div className={styles.tasks_list__total}>
       <div className={styles.tasks_list__total_name}>
         { props.userName }
       </div>
       <div className={styles.tasks_list__total_num}>
       {<FormattedMessage {...messages.totalTasks} />} <span className={`${styles.tasks_list__total_color} ${utilites.bold}`}>{props.totalTasks}</span>
       </div>
     </div>
  );

TaskListInfoBar.propTypes = {
  totalTasks: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
};


export default TaskListInfoBar;
