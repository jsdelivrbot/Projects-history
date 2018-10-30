import newAdjustmentHelpers from 'containers/Inventory/Adjustments/New/newAdjustmentHelpers';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('newAdjustmentHelpers', () => {
  const props = {
    reason: [],
    handleAdjustmentChange: jest.fn(),
    handleReasonChange: jest.fn()
  };

  it('renders the newAdjustmentHelpers component', () => {
    const component = shallow(<newAdjustmentHelpers { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of newAdjustmentHelpers', () => {
    const component = shallow(<newAdjustmentHelpers { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
