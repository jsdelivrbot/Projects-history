import { NotesTab } from 'containers/Purchase/Suppliers/Single/Tabs/NotesTab/NotesTab';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, expect, it } = global;

describe('NotesTab', () => {
  const props = {
    loadingPage: false,
    needReloadNotes: false,
    supplierId: 1,
    notes: [],
    supplierNotesGetRequest: jest.fn(),
    supplierNotesSaveRequest: jest.fn()
  };

  it('renders the NotesTab component', () => {
    const component = shallow(<NotesTab { ...props } />);

    expect(component.length).toEqual(1);
  });

  it('capturing Snapshot of NotesTab', () => {
    const component = shallow(<NotesTab { ...props } />);
    const view = toJson(component);
    const actual = expect(view);

    actual.toMatchSnapshot();
  });

  it('calls supplierNotesSaveRequest in handleSave with correct param', () => {
    const payload = 'Some payload';
    const component = shallow(<NotesTab { ...props } />);
    component.instance().handleSave(payload);

    expect(props.supplierNotesSaveRequest.mock.calls.length).toBe(1);

    expect(props.supplierNotesSaveRequest.mock.calls[0][0]).toEqual({
      id: props.supplierId,
      payload
    });
    props.supplierNotesSaveRequest.mock.calls.length = 0;
  });
});
