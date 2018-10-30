/* eslint-disable import/prefer-default-export */

/**
 * Used to get menu items for FormSelect
 * @param {Array} menuItems
 */
export const getMenuItems = menuItems => (
  menuItems.map(menuItem => ({ key: menuItem.id, value: menuItem.name }))
);

export const join2Arrays = (a, b) => [].concat(...a.map(aItem => b.map(bItem => [].concat(aItem, bItem))));

/**
 * Used to cross join values of array and optionally join values of the output arrays by symbol provided
 * @param {Array} a
 * @param {Array} b
 * @param {Array} c
 */
export const crossJoinArrays = (a, b, c) => {
  if (b && c && c.length > 0) {
    return crossJoinArrays(join2Arrays(a, b), c);
  } else if (b) {
    return join2Arrays(a, b);
  }
  return a;
};
