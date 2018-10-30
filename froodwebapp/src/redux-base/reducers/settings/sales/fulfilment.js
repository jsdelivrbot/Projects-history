import {
  TRANSPORTERS_GET,
  TRANSPORTERS_UPDATE,
  FULFILMENT_ITEM_GET_PARALLEL,
  SLOTS_GET,
  SLOTS_SAVE,
  SLOTS_UPDATE,
  SLOTS_STATUS_UPDATE,
  SLOTS_DELETE,
  HOLIDAYS_GET,
  HOLIDAYS_SAVE,
  HOLIDAYS_DELETE,
  EXTRAS_GET,
  EXTRAS_UPDATE,
  ERROR
} from 'redux-base/actions';

// --------------------------- Reducer function --------------------------
const initialState = {
  fulfilments: [],
  slots: [],
  holidays: [],
  loadingPage: false,
  needReloadSlots: false,
  needReloadHolidays: false,
  needReloadTransporters: false,
};

export default function transporters(state = initialState, action = {}) {
  switch (action.type) {
    case TRANSPORTERS_GET.REQUEST:
    case TRANSPORTERS_UPDATE.REQUEST:
    case FULFILMENT_ITEM_GET_PARALLEL.REQUEST:
    case SLOTS_GET.REQUEST:
    case SLOTS_UPDATE.REQUEST:
    case SLOTS_STATUS_UPDATE:
    case SLOTS_DELETE.REQUEST:
    case HOLIDAYS_GET.REQUEST:
    case HOLIDAYS_DELETE.REQUEST:
    case EXTRAS_GET.REQUEST:
    case EXTRAS_UPDATE.REQUEST:
      return {
        ...state,
        loadingPage: true,
        needReloadSlots: false,
        needReloadHolidays: false,
        needReloadTransporters: false
      };
    case TRANSPORTERS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        fulfilments: action.data
      };
    case FULFILMENT_ITEM_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        slots: action.data[0],
        extras: action.data[1]
      };
    case SLOTS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        slots: action.data
      };
    case HOLIDAYS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        holidays: action.data
      };
    case EXTRAS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        extras: action.data
      };
    case SLOTS_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadSlots: true
      };
    case HOLIDAYS_SAVE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadHolidays: true
      };
    case TRANSPORTERS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadTransporters: true
      };
    case SLOTS_UPDATE.SUCCESS:
    case SLOTS_STATUS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadSlots: true
      };
    case EXTRAS_UPDATE.SUCCESS:
      return {
        ...state,
        loadingPage: false
      };
    case SLOTS_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadSlots: true
      };
    case HOLIDAYS_DELETE.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        needReloadHolidays: true
      };
    case ERROR:
      return {
        ...state,
        loadingPage: false,
      };
    default:
      return state;
  }
}
