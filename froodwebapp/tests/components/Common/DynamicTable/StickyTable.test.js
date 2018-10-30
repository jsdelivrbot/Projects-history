import React from 'react';
import StickyTable from 'components/Common/DynamicTable/StickyTable';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

document.getElementById = (id) => {
  const domElement = document.createElement('div');
  domElement.id = id;
  domElement.querySelector = () => {
    const elemInDomElement = document.createElement('div');
    const someChild = document.createElement('div');
    elemInDomElement.appendChild(someChild);
    return elemInDomElement;
  };
  return domElement;
};

describe('StickyTable', () => {
  it('captures snapshot of StickyTable', () => {
    const props = {
      stickyColumnCount: 0,
      stickyHeaderCount: 0
    };

    const snappedComponent = shallow(<StickyTable { ...props }>
      <h1 key="1">Some data</h1>
      <h1 key="2">Some data</h1>
    </StickyTable>);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('checks for StickyTable`s children', () => {
    const props = {
      id: 1,
      onClick: jest.fn()
    };
    const snappedComponent = shallow(
      <StickyTable { ...props }>
        <h1 key="1">Some data</h1>
      </StickyTable>
    );
    expect(snappedComponent.props().children.length).toBe(7);
  });
});
