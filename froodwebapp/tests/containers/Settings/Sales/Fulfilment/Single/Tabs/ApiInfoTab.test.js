import { ApiInfoTab } from 'containers/Settings/Sales/Fulfilment/Single/Tabs/ApiInfoTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('ApiInfoTab', () => {
  const props = {
    loadingPage: false,
    initialValues: {},
    fulfilmentId: '1',
    extrasUpdateRequest: jest.fn(),
    handleSubmit: jest.fn()
  };

  it('renders the ApiInfoTab component', () => {
    const component = shallow(<ApiInfoTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of ApiInfoTab', () => {
    const component = shallow(<ApiInfoTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls extrasUpdateRequest in handleSave with correct param', () => {
    const formValues = 'Form values';
    const component = shallow(<ApiInfoTab { ...props } />);
    component.instance().handleSave(formValues);

    expect(props.extrasUpdateRequest.mock.calls.length).toBe(1);

    expect(props.extrasUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.fulfilmentId,
      payload: formValues
    });
  });
});
