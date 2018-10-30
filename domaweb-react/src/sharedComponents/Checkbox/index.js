import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/lib/md";
import { Label } from "../Label";
import styles from './checkbox.scss';

const style = {
    size: '22px',
  };

  /**
   * specify handleClick as lambda function in parent component
   */

const Checkbox = ({value, handleClick, children, disabled}) => {
    console.log(handleClick);
    if (disabled) {
        return (
            <div>
                <MdCheckBoxOutlineBlank className={styles.disabled} size={style.size} />
                <Label disabled={disabled}>{children}</Label>
            </div>
        );
    }
    return (
        <div onClick={handleClick} className={styles.wrapper}>
          {!value
            ? <MdCheckBoxOutlineBlank className={styles.unchecked} size={style.size} />
            : <MdCheckBox className={styles.checked} size={style.size} />
          }
          <Label className={styles.wrapper} disabled={disabled}>{children}</Label>
        </div>
    )
}

export default Checkbox;