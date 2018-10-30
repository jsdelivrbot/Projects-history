import { getMainContainerActions } from 'utils';

const { describe, it, expect } = global;

describe('getMainContainerActions', () => {
  it('returns request types', () => {
    const pageName = 'PriceLists';
    const resultObj = {
      GET: {
        FAILURE: 'PriceLists_GET_FAILURE',
        REQUEST: 'PriceLists_GET_REQUEST',
        SUCCESS: 'PriceLists_GET_SUCCESS'
      },
      GET_WITH_FILTER: {
        FAILURE: 'PriceLists_GET_WITH_FILTER_FAILURE',
        REQUEST: 'PriceLists_GET_WITH_FILTER_REQUEST',
        SUCCESS: 'PriceLists_GET_WITH_FILTER_SUCCESS'
      },
      SEARCH: {
        FAILURE: 'PriceLists_SEARCH_FAILURE',
        REQUEST: 'PriceLists_SEARCH_REQUEST',
        SUCCESS: 'PriceLists_SEARCH_SUCCESS'
      },
      FILTER_SAVE: {
        FAILURE: 'PriceLists_FILTER_SAVE_FAILURE',
        REQUEST: 'PriceLists_FILTER_SAVE_REQUEST',
        SUCCESS: 'PriceLists_FILTER_SAVE_SUCCESS'
      },
      FILTER_UPDATE: {
        FAILURE: 'PriceLists_FILTER_UPDATE_FAILURE',
        REQUEST: 'PriceLists_FILTER_UPDATE_REQUEST',
        SUCCESS: 'PriceLists_FILTER_UPDATE_SUCCESS'
      },
      FILTER_DELETE: {
        FAILURE: 'PriceLists_FILTER_DELETE_FAILURE',
        REQUEST: 'PriceLists_FILTER_DELETE_REQUEST',
        SUCCESS: 'PriceLists_FILTER_DELETE_SUCCESS'
      },
      CHANGE_ACTIVE_FILTER: {
        FAILURE: 'PriceLists_CHANGE_ACTIVE_FILTER_FAILURE',
        REQUEST: 'PriceLists_CHANGE_ACTIVE_FILTER_REQUEST',
        SUCCESS: 'PriceLists_CHANGE_ACTIVE_FILTER_SUCCESS',
      },
      DOWNLOAD_ITEM: {
        FAILURE: 'PriceLists_DOWNLOAD_ITEM_FAILURE',
        REQUEST: 'PriceLists_DOWNLOAD_ITEM_REQUEST',
        SUCCESS: 'PriceLists_DOWNLOAD_ITEM_SUCCESS'
      },
      UPDATE_DEFAULT_COLUMNS: {
        FAILURE: 'PriceLists_UPDATE_DEFAULT_COLUMNS_FAILURE',
        REQUEST: 'PriceLists_UPDATE_DEFAULT_COLUMNS_REQUEST',
        SUCCESS: 'PriceLists_UPDATE_DEFAULT_COLUMNS_SUCCESS'
      }
    };

    expect(getMainContainerActions(pageName)).toEqual(resultObj);
  });
});
