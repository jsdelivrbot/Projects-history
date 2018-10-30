import { Fulfilment } from 'containers/Settings/Sales/Fulfilment/All/Fulfilment';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('Fulfilment', () => {
  const props = {
    data: [],
    loadingPage: false,
    needReloadTransporters: false,
    transportersGetRequest: jest.fn(),
    transportersUpdateRequest: jest.fn()
  };

  it('renders the Fulfilment component', () => {
    const component = shallow(<Fulfilment { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of Fulfilment', () => {
    const component = shallow(<Fulfilment { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls transportersUpdateRequest in handleUpdateFulfilmentStatus with correct param', () => {
    const e = {
      target: {
        id: '1',
        checked: false
      }
    };
    const component = shallow(<Fulfilment { ...props } />);
    component.instance().handleUpdateFulfilmentStatus(e);

    expect(props.transportersUpdateRequest.mock.calls.length).toBe(1);

    expect(props.transportersUpdateRequest.mock.calls[0][0]).toEqual({
      payload: {
        id: e.target.id,
        isActive: e.target.checked
      }
    });
  });
});
