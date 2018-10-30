/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { FroodInput, FroodDatePicker } from 'components';

const getComponentByType = (
  id,
  type,
  value,
  handleFilterInputChange,
  handleDatePickerChange
) => {
  switch (true) {
    case type.includes('datetime'):
      return (
        <FroodDatePicker
          id={ id.toString() }
          onChange={ handleDatePickerChange }
          value={ value }
        />
      );
    case type.includes('varchar'):
      return (
        <FroodInput
          id={ id }
          value={ value }
          onChange={ handleFilterInputChange }
        />);
    default:
      return null;
  }
};

export default getComponentByType;
