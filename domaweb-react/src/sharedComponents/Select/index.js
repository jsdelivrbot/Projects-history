import React from 'react';
import styles from './select.scss';
import { InputContainer } from '../InputContainer';

const Select = ({options, labelName, valueName, value, ...rest}) =>
    <InputContainer {...rest}>
        <select>
            {options ? options.map((item, index) =>
                <option 
                    key={index} value={item[valueName]}
                    label={item[labelName]}
                    onChange={(e) => onChange(e.target.value)}
                    style={value && value === item[valueName] ? {backgroundColor: '#00AEEF', color: '#FFFFFF'} : undefined}
                    >
                        {item[labelName]}
                </option>
            ): <option>Ei valintoja</option>}
        </select>
    </InputContainer>

Select.defaultProps = {
    labelName: 'label',
    valueName: 'value',
  }

export default Select;