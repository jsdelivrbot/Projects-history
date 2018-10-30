import React from 'react'; 
import PropTypes from 'prop-types';
import { onlyUpdateForKeys, flattenProp, renameProp } from 'recompose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

//USAGE INSTRUCTIONS AT THE END OF FILE

const DynamicForm = (name, selector, dispatchToProps = null, rename = 'value') => (WrappedComponent) => {
  // ...and returns another component...
  const onlyUpdate = onlyUpdateForKeys([rename, 'required']);
  class FormComponent extends React.Component {
    render() {
      console.log(this.props);
      return <WrappedComponent {...this.props} identifier={name} />;
    }
  };
  const mapStateToProps = createStructuredSelector({
    [rename]: selector(name),
  });

  return connect(mapStateToProps, dispatchToProps)(onlyUpdate(FormComponent));
}

export default DynamicForm;

/** Example Higher order function to provide form methods the right name for updating stuff
function dispatchHOF(name) {
  return function mapDispatchToProps(dispatch) {
    return {
      submit: ({ value }) => dispatch(updateFormValue(name, value)),
      onChange: (props) => dispatch(updateFormValue(name, props)),
    };
  };
}

Example selector which can be supplied as selector.
Notice: selectAddMedicationDomain is the state's base selector. If the selector
supplied doesn't include the base selector, you get a nasty error.

const selectMedicationTemplate = (prop) => createSelector(
  selectAddNewMedicationDomain(),
  (substate) => substate.getIn(['form', 'fields', `${prop}`]),
);

Wrapper to wrap components into DynamicForm, notice the usage of dispatchHOF

export const FormWrapper = (name) => (component) =>
  DynamicForm(name, selectMedicationTemplate, dispatchHOF(name))(component);

NOW components can be composed like this:

import { Select } from 'your/path'
const MedicationType = FormWrapper('medicationType')(Select)

MedicationType now has submit and onChange functions and gets it's value mapped directly
from store

then use it just like any component:

<MedicationType text={'Bullshit'} />


  */