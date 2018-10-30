/* eslint-disable import/prefer-default-export */

/**
 * Used in Sagas to automatically add params to urls
 * @param {object} filter
 * @param {string} url
 */
export const addParamsToURL = (filter, url) => {
  const params = [
    'orderNo',
    'id',
    'countryId',
    'locationId',
    'contactId',
    'mappingId',
    'slotId',
    'holidayId',
    'zoneId',
    'zoneType',
    'linkId',
    'addressId',
    'vendorId',
    'detailId',
    'itemId',
    'locationId',
    'slcId',
    'imageId'
  ];
  let newUrl = url;

  if (filter.limit) {
    newUrl += `?limit=${filter.limit}&offset=${filter.offset}`;
  }

  if (filter.limit && filter.sortBy) {
    newUrl += `&sortBy=${filter.sortBy}&sortOrder=${filter.sortOrder}`;
  }

  params.forEach((param) => {
    if (filter[param] && url.includes(param)) {
      newUrl = newUrl.replace(`{${param}}`, filter[param]);
    } else if (filter[param]) {
      newUrl += `&${param}=${filter[param]}`;
    }
  });

  // autocomplete logic
  newUrl = newUrl.includes('{keyword}') ? newUrl.replace('{keyword}', filter.payload) : newUrl;

  return newUrl;
};
