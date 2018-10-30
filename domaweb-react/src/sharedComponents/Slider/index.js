import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

function Slider(props) {
  return (
    <div>
      <InputRange
        maxValue={props.maxvalue}
        minValue={props.minvalue}
        value={props.midvalue}
        onChange={value => props.sliderChange(value)}
        onChangeComplete={value => props.onChangeComplete(value)}
        className="InputRange"
      />
    </div>
  );
}

export default Slider;
