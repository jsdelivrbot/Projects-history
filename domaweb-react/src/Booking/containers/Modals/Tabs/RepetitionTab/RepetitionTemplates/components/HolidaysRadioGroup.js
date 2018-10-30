import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  ButtonToolbar,
  ToggleButtonGroup,
  ControlLabel,
} from 'react-bootstrap';

export const HolidaysRadioGroup = ({
  handleradioinput,
  id,
  option,
}) => (
  <div>
    <ControlLabel>In case of day is holiday:</ControlLabel>
    <ButtonToolbar>
      <ToggleButtonGroup
        type="radio"
        onChange={handleradioinput}
        name={`EveryDayRadio ${id}`}
        defaultValue={option}
      >
        <Radio value={'ALLOW_SPECIAL_HOLIDAY'} name="radioGroup">
          Allow dates to be on holidays
        </Radio>
        <Radio value={'MOVE_FORWARD'} name="radioGroup">
          Move the date forward to next normal working day
        </Radio>
        <Radio value={'MOVE_BACKWARD'} name="radioGroup">
          Move the date backward to previous normal working day
        </Radio>
        <Radio value={'OMIT'} name="radioGroup">
          Omit that day altogether
        </Radio>
      </ToggleButtonGroup>
    </ButtonToolbar>
  </div>
);

HolidaysRadioGroup.propTypes = {
  handleradioinput: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  option: PropTypes.string,
};

export default HolidaysRadioGroup;
