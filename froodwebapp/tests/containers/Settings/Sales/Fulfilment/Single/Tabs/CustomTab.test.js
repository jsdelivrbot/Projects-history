import { CustomTab } from 'containers/Settings/Sales/Fulfilment/Single/Tabs/CustomTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('NumerationFormatsPage', () => {
  const props = {
    loadingPage: false,
    readonly: false,
    initialValues: {},
    fulfilmentId: '1',
    extrasUpdateRequest: jest.fn(),
    handleSubmit: jest.fn()
  };

  it('renders the CustomTab component', () => {
    const component = shallow(<CustomTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of CustomTab', () => {
    const component = shallow(<CustomTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls extrasUpdateRequest in handleSave with correct param', () => {
    const formValues = 'Form values';
    const component = shallow(<CustomTab { ...props } />);
    component.instance().handleSave(formValues);

    expect(props.extrasUpdateRequest.mock.calls.length).toBe(1);

    expect(props.extrasUpdateRequest.mock.calls[0][0]).toEqual({
      id: props.fulfilmentId,
      payload: formValues
    });
  });
});
