import React from 'react';
import { Controls } from 'components/Common';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('Controls', () => {
  it('captures snapshot of Controls without buttons', () => {
    const props = {
      saveButtonVisible: false,
      saveButtonText: 'text',
      onSaveButtonClick: jest.fn(),
      submitButtonVisible: false,
      submitButtonText: 'text',
      updateButtonVisible: false,
      updateButtonText: 'text',
      onUpdateButtonClick: jest.fn(),
      cancelButtonVisible: false,
      onCancelButtonClick: jest.fn()
    };
    const snappedComponent = shallow(<Controls { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('captures snapshot of Controls with buttons', () => {
    const props = {
      saveButtonVisible: true,
      saveButtonText: 'text',
      onSaveButtonClick: jest.fn(),
      submitButtonVisible: true,
      submitButtonText: 'text',
      updateButtonVisible: true,
      updateButtonText: 'text',
      onUpdateButtonClick: jest.fn(),
      cancelButtonVisible: true,
      onCancelButtonClick: jest.fn()
    };
    const snappedComponent = shallow(<Controls { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
