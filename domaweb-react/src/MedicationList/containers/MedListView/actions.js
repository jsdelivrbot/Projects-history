/*
 *
 * MedListView actions
 *
 */

import {
  TOGGLE_MED_VIEW,
  SET_MODAL_STATUS,
  TOGGLE_TABS,
  RESET_TABS,
  TOGGLE_ADD_NEW_MODAL,
  SET_ADD_NEW_MODAL_STATUS,
  TOGGLE_CHECK_LOG,
} from './constants';

export function toggleMedView() {
  return {
    type: TOGGLE_MED_VIEW,
  };
}

export function setModalStatus(status) {
  return {
    type: SET_MODAL_STATUS,
    data: !status,
  };
}

export function toggleTabs(activeTab) {
  return {
    type: TOGGLE_TABS,
    active: activeTab,
  };
}

export function resetTabs(tabs) {
  return {
    type: RESET_TABS,
    data: tabs,
  };
}

export function toggleAddNewModal() {
  return {
    type: TOGGLE_ADD_NEW_MODAL,
  };
}

export function setAddNewModalStatus(status) {
  return {
    type: SET_ADD_NEW_MODAL_STATUS,
    data: !status,
  };
}

export function toggleCheckLog(status) {
  return {
    type: TOGGLE_CHECK_LOG,
    data: !status,
  };
}
