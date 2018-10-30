import { LoadingDataPage } from 'containers/Common/LoadingDataPage/LoadingDataPage';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('LoadingDataPage', () => {
  const props = {
    user: {},
    commonDataLoaded: true,
    commonDataLoading: false,
    push: jest.fn(),
    location: {
      pathname: 'pathname',
      newPath: 'newPath'
    }
  };

  it('renders the LoadingDataPage component', () => {
    const component = shallow(<LoadingDataPage { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of LoadingDataPage', () => {
    const component = shallow(<LoadingDataPage { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls push function in handleRedirect function with correct param', () => {
    const location = {
      state: {
        redirectFrom: 'redirectForm',
        id: '1'
      }
    };
    const component = shallow(<LoadingDataPage { ...props } />);
    component.instance().handleRedirect(props.commonDataLoaded, location);

    expect(props.push.mock.calls.length).toBe(1);

    expect(props.push.mock.calls[0][0]).toEqual({
      pathname: location.state.redirectFrom,
      state: {
        id: location.state.id
      }
    });
  });
});
