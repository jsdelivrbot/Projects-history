import React from 'react';
import { DraggableHeader } from 'components/Common/DynamicTable/DraggableHeader';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('DraggableHeader', () => {
  it('capturing Snapshot of DraggableHeader', () => {
    const props = {
      headerId: 1,
      headerText: 'Some text',
      headerDataType: 'string',
      index: 1,
      isDragging: false,
      isSortable: true,
      handleSort: jest.fn(),
      saveHeaderOrder: jest.fn(),
      moveHeader: jest.fn(),
      connectDragSource(dragSource) {
        return dragSource;
      },
      connectDropTarget(dropTarget) {
        return dropTarget;
      }
    };
    const component = shallow(<DraggableHeader { ...props } />);
    const view = toJson(component);
    const actual = expect(view);
    actual.toMatchSnapshot();
  });
});
