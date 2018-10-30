import React from 'react';
import styles from './input.scss';
import { MdWarning, MdCheckCircle } from 'react-icons/lib/md';
import { InputStyleWrapper } from './InputStyleWrapper';

/** Field for displaying warning icon */
export const InputWarning = ({error, success}) =>
<span className={`${styles.icon} ${error ? styles.warning : success ? styles.success : undefined}`}>
    {error && <MdWarning size={'22px'} />}
    {success && !error && <MdCheckCircle size={'22px'} />}
</span>