import React from 'react';
import Tag from 'components/Header/TasksMenu/Tag';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('Tag', () => {
  it('captures snapshot of tag', () => {
    const snappedComponent = shallow(<Tag />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
