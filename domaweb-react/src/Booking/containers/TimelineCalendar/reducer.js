import { fromJS, update } from 'immutable';
import {
  LOAD_EMPLOYEES_GROUP,
  LOAD_EMPLOYEES_GROUP_SUCCESS,
  LOAD_EMPLOYEES_GROUP_FAILED,
  LOAD_EMPLOYEES_ITEMS_SUCCESS,
  LOAD_GROUP_GROUP_SUCCESS,
  LOAD_GROUP_ITEM_SUCCESS,
  LOAD_CUSTOMERRESOURCES_SUCCESS,
  LOAD_TASKDETAILS,
  LOAD_TASKDETAILS_SUCCESS,
  LOAD_TASKDETAILS_FAILED,
  TASKEDIT_SAVED,
  TASKEDIT_SAVED_SUCCESS,
  TASKEDIT_SAVED_FAILED,
  LOAD_TEMPLATEREPETITIONS_SUCCESS,
  LOAD_AVAILABLESERVICES_SUCCESS,
  LOAD_TASKTYPESERVICES_SUCCESS,
  LOAD_SPECIALHOLIDAYS_SUCCESS,
  LOAD_REPETITIONSVIEW_SUCCESS,
  ITEMMOVE_LOAD,
  ITEMMOVE_LOAD_SUCCESS,
  ITEMMOVE_LOAD_FAILED,
  UPDATE_REPETITIONALL,
  UPDATE_REPETITIONALL_SUCCESS,
  UPDATE_REPETITIONALL_FAILED,
  TASKADD_SAVED,
  TASKADD_SAVED_SUCCESS,
  TASKADD_SAVED_FAILED,
  ADD_GROUP_ITEM,
  ADD_EMPLOYEE_ITEM,
  DELETE_EMPLOYEE_ITEM,
  DELETE_GROUP_ITEM,
  TASKEDIT_EDIT_END,
  TASKADD_SAVED_END,
  NULL_SERVICES_AND_TASKTYPES,
  LOAD_TYPED_SERVICES,
  LOAD_ADDED_TASK,
  UPDATE_REPETITIONS_VIEW,
  SELECT_CALENDAR_ITEM,
} from './constants';

const initialState = fromJS({
  employeesGroup: [],
  employeesItems: [],
  groupGroups: [],
  groupItems: [],
  error: null,
  customerResources: [],
  taskdetails: [],
  isTaskLoading: false,
  taskEditLoading: null,
  taskEditStatus: null,
  templaterepetitions: [],
  availableservices: [],
  tasktypeservices: [],
  specialholidays: [],
  repetitionsview: [],
  itemMovedStatus: false,
  updateRepetition: false,
  taskAdd: null,
  timelineLoading: true,
  employeeGroupLoading: false,
  employeeItemLoading: false,
  groupGroupsLoading: false,
  groupItemsLoading: false,
  customerResourceLoading: false,
  percentage: null,
  repetitionViews: {},
  selectedCalendarItem: '',
});

// Booking reducer

function timelineCalendarReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EMPLOYEES_GROUP:
      return state.set('percentage', 0)
                  .set('timelineLoading', true);

    case LOAD_EMPLOYEES_GROUP_SUCCESS:
      return state.set('employeesGroup', action.employeesGroup)
                  .set('percentage', 100)
                  .set('timelineLoading', false);

    case LOAD_EMPLOYEES_GROUP_FAILED:
      return state.set('error', action.error);

    case LOAD_EMPLOYEES_ITEMS_SUCCESS:
      return state.set('employeesItems', action.employeesItems)
                  .set('percentage', 10)
                  .set('timelineLoading', true);

    case LOAD_GROUP_GROUP_SUCCESS:
      return state.set('groupGroups', action.groupGroups)
                  .set('percentage', 30)
                  .set('timelineLoading', true);

    case LOAD_GROUP_ITEM_SUCCESS:
      return state.set('groupItems', action.groupItems)
                  .set('percentage', 50)
                  .set('timelineLoading', true);

    case LOAD_CUSTOMERRESOURCES_SUCCESS:
      return state.set('customerResources', action.customerResources)
                  .set('percentage', 70)
                  .set('timelineLoading', true);

    case LOAD_TASKDETAILS:
      return state.set('taskdetails')
                  .set('isTaskLoading', true);

    case LOAD_TASKDETAILS_SUCCESS:
      return state.set('taskdetails', action.taskdetails)
                  .set('isTaskLoading', false);

    case LOAD_TASKDETAILS_FAILED:
      return state.set('error', action.error);

    case TASKEDIT_SAVED:
      return state.set('taskEditLoading', true);

    case TASKEDIT_SAVED_SUCCESS:
      return state.set('taskEditLoading', null)
                  .set('taskEditStatus', 'success');

    case TASKEDIT_EDIT_END:
      return state.set('taskEditStatus', null);

    case TASKEDIT_SAVED_FAILED:
      return state.set('taskEditLoading', null)
                  .set('taskEditStatus', 'failed');

    case LOAD_TEMPLATEREPETITIONS_SUCCESS:
      return state.set('templaterepetitions', action.templaterepetitions)
                  .set('isTaskLoading', true);

    case LOAD_AVAILABLESERVICES_SUCCESS:
      return state.set('availableservices', action.availableservices)
                  .set('isTaskLoading', true);

    case LOAD_TASKTYPESERVICES_SUCCESS:
      return state.set('tasktypeservices', action.tasktypeservices)
                  .set('isTaskLoading', true);

    case LOAD_SPECIALHOLIDAYS_SUCCESS:
      return state.set('specialholidays', action.specialholidays)
                  .set('isTaskLoading', true);

    case LOAD_REPETITIONSVIEW_SUCCESS:
      return state.set('repetitionsview', action.repetitionsview);

    // item move
    case ITEMMOVE_LOAD:
      return state.set('itemMovedStatus', false);

    case ITEMMOVE_LOAD_SUCCESS:
      return state.set('itemMovedStatus', true);

    case ITEMMOVE_LOAD_FAILED:
      return state.set('itemMovedStatus', false);

    // update repetition all
    case UPDATE_REPETITIONALL:
      return state;

    case UPDATE_REPETITIONALL_SUCCESS:
      return state.set('updateRepetition', true);

    case UPDATE_REPETITIONALL_FAILED:
      return state.set('updateRepetition', false);

    // task add
    case TASKADD_SAVED:
      return state;

    case TASKADD_SAVED_SUCCESS:
      return state.set('taskAdd', 'success');

    case TASKADD_SAVED_FAILED:
      return state.set('taskAdd', 'failed');

    case TASKADD_SAVED_END:
      return state.set('taskAdd', null);

    case ADD_GROUP_ITEM:
      const groupItems = state.get('groupItems');
      const objIndex = groupItems.findIndex((item => item.id === action.data.id));
      const addGroupArr = fromJS(groupItems).toJS();

      if (objIndex === -1) {
        addGroupArr.push(action.data);
      } else {
        addGroupArr[objIndex] = action.data;
      }
      return state.set('groupItems', addGroupArr);

    case ADD_EMPLOYEE_ITEM:
      const employeesItems = state.get('employeesItems');
      const index = employeesItems.findIndex((item => item.id === action.data.id));
      const addEmployeeArr = fromJS(employeesItems).toJS();

      if (index === -1) {
        addEmployeeArr.push(action.data);
      } else {
        addEmployeeArr[index] = action.data;
      }
      return state.set('employeesItems', addEmployeeArr);

    case DELETE_EMPLOYEE_ITEM:
      const EmployeeItems = state.get('employeesItems');
      const indexToDelete = EmployeeItems.findIndex((item => item.id === action.id));
      let newArr = fromJS(EmployeeItems);
      if (indexToDelete > -1) {
        newArr = newArr.splice(indexToDelete, 1);
      }
      return state.set('employeesItems', newArr.toJS());

    case DELETE_GROUP_ITEM:
      const GroupItems = state.get('groupItems');
      const delIndex = GroupItems.findIndex((item => item.id === action.id));
      let copyOfGroupItems = fromJS(GroupItems);
      if (delIndex > -1) {
        copyOfGroupItems = copyOfGroupItems.splice(delIndex, 1);
      }
      return state.set('groupItems', copyOfGroupItems.toJS());

    case NULL_SERVICES_AND_TASKTYPES:
      return state.set('availableservices', [])
        .set('tasktypeservices', [])
        .set('typedServices', []);

    case LOAD_TYPED_SERVICES:
      return state.set('typedServices', action.typedServices);

    case LOAD_ADDED_TASK:
      return state.set('addedTask', action.id);

    case UPDATE_REPETITIONS_VIEW:
      const repetitionViews = state.get('repetitionViews');
      const newRepetitionViews = repetitionViews.set(action.id, action.data);

      return state.set('repetitionViews', newRepetitionViews);

    case SELECT_CALENDAR_ITEM:
      return state.set('selectedCalendarItem', action.id);

    default:
      return state;
  }
}

export default timelineCalendarReducer;
