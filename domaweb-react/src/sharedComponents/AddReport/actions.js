/*
 *
 * Add Report actions
 *
 */
import {
  LOAD_SYMBOLS, LOAD_SYMBOLS_SUCESS, LOAD_SYMBOLS_FAILED,
  SUMBIT_REPORT, SUMBIT_REPORT_SUCESS, SUMBIT_REPORT_FAILED,
} from './constants';

export function loadSymbols() {
  return {
    type: LOAD_SYMBOLS,
  };
}

export function symbolsLoaded(units) {
  return {
    type: LOAD_SYMBOLS_SUCESS,
    units,
  };
}

export function symbolsLoadingFailed() {
  return {
    type: LOAD_SYMBOLS_FAILED,
  };
}

export function submitReport(customerId, payload) {
  return {
    type: SUMBIT_REPORT,
    customerId,
    payload,
  };
}

export function reportSubmited() {
  return {
    type: SUMBIT_REPORT_SUCESS,
  };
}

export function reportSubmitedFailed() {
  return {
    type: SUMBIT_REPORT_FAILED,
  };
}
