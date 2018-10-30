import React from 'react';
import { TopFormModal } from 'components/Common/TopFormModal/TopFormModal';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('TopFormModal', () => {
  it('captures snapshot of TopFormModal', () => {
    const props = {
      loading: true,
      title: 'title',
      visible: false,
      buttonVisible: false,
      handleSave: jest.fn(),
      handleToggleModal: jest.fn(),
      handleSubmit: jest.fn(),
      fields: [],
      initialValues: [],
      okText: 'ok',
      buttonText: 'submit'
    };
    const snappedComponent = shallow(<TopFormModal { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
