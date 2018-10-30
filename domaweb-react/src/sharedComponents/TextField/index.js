import React from 'react';
import { InputContainer } from '../InputContainer';
import styles from './textfield.scss';

const Textfield = (props) => 
    <InputContainer {...props}>
        <textarea rows={8} className={styles.textfield} />
    </InputContainer>

export default Textfield;