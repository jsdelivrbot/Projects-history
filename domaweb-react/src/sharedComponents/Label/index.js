import React from 'react';
import styles from './label.scss';

export const Label = ({children, disabled, className}) => 
    <label className={`${disabled ? styles.disabled : styles.label} ${className ? className : undefined}`}>
        {children}
    </label>