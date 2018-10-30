/* eslint-disable arrow-parens, babel/arrow-parens */

/**
 *
 * @param {string} base
 */
export const createRequestTypes = (base) => ({
  REQUEST: `${base}_REQUEST`,
  SUCCESS: `${base}_SUCCESS`,
  FAILURE: `${base}_FAILURE`
});

/**
 *
 * @param {string} actionType
 * @param {array} endpoint
 * @param {string} responseType
 */
export const createRequestFunc = (
  actionType,
  endpoint,
  responseType
) => (...props) => (
  Object.assign(
    ...props,
    {
      endpoint,
      responseType: responseType || null,
      type: actionType.REQUEST,
      successCb: (data) => ({
        data,
        type: actionType.SUCCESS
      })
    }
  )
);

/**
 *
 * @param {string} actionType
 * @param {array} endpoints
 * @param {string} responseType
 */
export const createParallelRequestFunc = (
  actionType,
  endpoints,
  responseType
) => (...props) => (
  Object.assign(
    ...props,
    {
      endpoints,
      responseType: responseType || 'json',
      type: actionType.REQUEST,
      successCb: (data) => ({
        data,
        type: actionType.SUCCESS
      })
    }
  )
);
