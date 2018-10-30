import React from 'react';
import styles from './input.scss';

/** component for notifications field */
export const InputNotifications = ({error, length, maxLength}) => 
<div className={styles.notifications}>
    {error && error}
    {maxLength && <div className={styles.length}>{length} / {maxLength}</div>}
</div>