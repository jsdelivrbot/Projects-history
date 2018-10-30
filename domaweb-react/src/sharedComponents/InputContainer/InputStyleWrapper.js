import React from 'react';
import styles from './input.scss';


/** Wrapper for the child components of input*/
export const InputStyleWrapper = ({children, success, focus, disabled, error}) => 
<div className={`${styles.wrapper} ${disabled ? undefined : error ? styles.error : success && focus ? styles.allowed : focus ? styles.focus :  undefined}`}>
    {children}
</div>