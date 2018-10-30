import { TopButtons } from 'containers/Common/MainContainer/MainContainerSections/TopButtons/TopButtons';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('TopButtons', () => {
  const props = {
    statsEnabled: false,
    statsVisible: false,
    handleToggleStats: jest.fn(),
    newButtonVisible: false,
    newButtonText: 'Single button text',
    newButtonLink: 'Single button link',
    exportButton: false,
    onExportButtonClick: jest.fn(),
    printButton: false,
    printButtonText: 'Print',
    onPrintButtonClick: jest.fn(),
    push: jest.fn(),
  };

  it('renders the TopButtons component', () => {
    const component = shallow(<TopButtons { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of TopButtons', () => {
    const component = shallow(<TopButtons { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });
});
