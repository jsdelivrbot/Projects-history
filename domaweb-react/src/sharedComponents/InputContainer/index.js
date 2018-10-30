import React from 'react';
import styles from './input.scss';
import { Label } from '../Label';
import { MdWarning, MdCheckCircle } from 'react-icons/lib/md';
import { InputStyleWrapper } from './InputStyleWrapper';
import { InputNotifications } from './InputNotifications';
import { InputWarning } from './InputWarning';


/*
    container for input components. Injects styles and necessary methods
*/

export class InputContainer extends React.Component {// eslint-disable-line react/prefer-stateless-function
    constructor(props) {
      super(props);
      this.state = {
        focus: false,
      }
    }
    setFocus = (value) => this.setState({focus: value});
    render() {
      const {error, value, onChange, label, className, select, children, style, placeholder, success, maxLength, disabled, ...rest} = this.props;
      const { focus } = this.state;
      const len = value && value.length ? value.length : null;
      console.log('input container props');
      console.log(this.props);
      return (
        <div>
            {/*Label for the field*/}
            <div>
                <Label {...rest}>{label}</Label>
            </div>
            {/*children are injected with all these props*/}
            <InputStyleWrapper {...this.props} {...this.state}>
                {React.cloneElement(children, {
                    placeholder: placeholder,
                    className: `${styles.textfield} ${!select ? styles.withInlineError : styles.withoutInlineError} ${styles.input} ${disabled ? styles.disabled : undefined}`,
                    value: value,
                    onChange: (e) => !disabled ? onChange(e.target.value): undefined,
                    onFocus: () => this.setFocus(true),
                    onBlur: () => this.setFocus(false),
                    ...rest,
                })}
                {/*warning field icon*/}
                {!select && <InputWarning {...this.props} />}
            </InputStyleWrapper>
            {/*Notifications and optional value length are displayer here*/}
            <InputNotifications length={len} {...this.props} />
        </div>
      );
    }
  }


  export default InputContainer;