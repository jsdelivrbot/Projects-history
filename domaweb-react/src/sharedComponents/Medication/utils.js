
//for composing strings for medication reducer
export const composeString = (identifier, actionName) =>
`app/sharedReducers/Medication/${identifier}_${actionName}`;

export const actionBody = {
  type: null,
  data: null,
};

export const getMedList = 'GET_MEDICATION_LIST';
export const getMedlistSuccess = 'GET_MEDICATION_LIST_SUCCESS';
export const getSingleMed = 'GET_SINGLE_MEDICATION';
export const getSingleMedSuccess = 'GET_SINGLE_MEDICATION_SUCCESS';
export const getAtc = 'GET_ATC';
export const getAtcSuccess = 'GET_ATC_SUCCESS';

export function ComposeConstant(identifier) {
  this.GET_MEDICATION_LIST = composeString(identifier, getMedList);
  this.GET_MEDICATION_LIST_SUCCESS = composeString(identifier, getMedlistSuccess);
  this.GET_SINGLE_MEDICATION = composeString(identifier, getSingleMed);
  this.GET_SINGLE_MEDICATION_SUCCESS = composeString(identifier, getSingleMedSuccess);
  this.GET_ATC = composeString(identifier, getAtc);
  this.GET_ATC_SUCCESS = composeString(identifier, getAtcSuccess);
}

export default function ComposeAction(identifier) {
  this.getMedicationList = () => {
    const obj = actionBody;
    obj.type = composeString(identifier, getMedList);
    return obj;
  };
  this.getMedicationListSuccess = (list) => {
    const obj = actionBody;
    obj.type = composeString(identifier, getMedlistSuccess);
    obj.data = list;
    return obj;
  };
  this.getSingleMedication = () => {
    const obj = actionBody;
    obj.type = composeString(identifier, getSingleMed);
    return obj;
  };
  this.getSingleMedicationSuccess = (list) => {
    const obj = actionBody;
    obj.type = composeString(identifier, getSingleMedSuccess);
    obj.data = list;
    return obj;
  };
  this.getAtc = () => {
    const obj = actionBody;
    obj.type = composeString(identifier, getAtc);
    return obj;
  };
  this.getAtcSuccess = (list) => {
    const obj = actionBody;
    obj.type = composeString(identifier, getAtcSuccess);
    obj.data = list;
    return obj;
  };
}
/*
export function medicationAction() {
  return {
    type: TOGGLE_MED_VIEW,
  };
}*/
