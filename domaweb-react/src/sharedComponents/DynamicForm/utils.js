
//for composing strings for medication reducer
export const composeString = (identifier, actionName) =>
`app/sharedComponents/Medication/${identifier}_${actionName}`;

export const actionBody = {
  type: null,
  data: null,
};

export const updateValue = 'UPDATE_FORM_VALUE';
export const updateRequired = 'UPDATE_REQUIRED_FIELD';
export const updateValueLazy = 'UPDATE_FORM_VALUE_LAZY';
export const updateRequiredLazy = 'UPDATE_REQUIRED_FIELD_LAZY';
export const formatForm = 'FORMAT_FORM';
export const compoundAction = 'COMPOUND_ACTION';

export function ComposeConstant(identifier) {
  this.UPDATE_FORM_VALUE = composeString(identifier, updateValue);
  this.UPDATE_REQUIRED_FIELD = composeString(identifier, updateRequired);
  this.UPDATE_FORM_VALUE_LAZY = composeString(identifier, updateValueLazy);
  this.UPDATE_REQUIRED_FIELD_LAZY = composeString(identifier, updateRequiredLazy);
  this.FORMAT_FORM = composeString(identifier, formatForm);
  this.COMPOUND_ACTION = composeString(identifier, compoundAction);
}

export default function ComposeAction(identifier) {
  this.updateFormValue = (fragment, prop) => {
    const obj = actionBody;
    obj.type = composeString(identifier, updateValue);
    obj.value = prop;
    obj.fragment = fragment;
    return obj;
  };
  this.updateRequired = (fragment, prop) => {
    const obj = actionBody;
    obj.type = composeString(identifier, updateRequired);
    obj.value = prop;
    obj.fragment = fragment;
    return obj;
  };
  this.updateFormValueLazy = (fragment, prop) => {
    const obj = actionBody;
    obj.type = composeString(identifier, updateValueLazy);
    obj.value = prop;
    obj.fragment = fragment;
    return obj;
  };
  this.updateRequiredLazy = (fragment, prop) => {
    const obj = actionBody;
    obj.type = composeString(identifier, updateRequiredLazy);
    obj.value = prop;
    obj.fragment = fragment;
    return obj;
  };
  this.formatForm = (form) => {
    const obj = actionBody;
    obj.type = composeString(identifier, formatForm);
    obj.data = form;
    return obj;
  };
  this.compoundAction = (prop) => {
    const obj = actionBody;
    obj.type = composeString(identifier, compoundAction);
    obj.data = prop;
    return obj;
  };
}