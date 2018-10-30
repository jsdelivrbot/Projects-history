import React from 'react';
import { TableActionButtons } from 'components/Common';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('TableActionButtons', () => {
  it('captures snapshot of TableActionButtons without buttons', () => {
    const props = {
      record: {},
      editButtonVisible: false,
      deleteButtonVisible: false,
      activateButtonVisible: false,
      confirmButtonVisible: false,
      confirmedButtonVisible: false,
      handleEdit: jest.fn(),
      handleActivate: jest.fn(),
      handleDeactivate: jest.fn(),
      handleConfirm: jest.fn()
    };
    const snappedComponent = shallow(<TableActionButtons { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('captures snapshot of TableActionButtons with buttons', () => {
    const props = {
      record: {},
      editButtonVisible: true,
      deleteButtonVisible: true,
      activateButtonVisible: true,
      confirmButtonVisible: true,
      confirmedButtonVisible: true,
      handleEdit: jest.fn(),
      handleActivate: jest.fn(),
      handleDeactivate: jest.fn(),
      handleConfirm: jest.fn()
    };
    const snappedComponent = shallow(<TableActionButtons { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
