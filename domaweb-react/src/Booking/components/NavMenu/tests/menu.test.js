import React from 'react';
import { shallow } from 'react-test-renderer/shallow';

import NavMenu from '../../NavMenu';

describe('<NavMenu />', () => {
  it('should render Navmenu ', () => {
    const renderedComponent = shallow(<NavMenu />);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<NavMenu />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Item id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Item attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
