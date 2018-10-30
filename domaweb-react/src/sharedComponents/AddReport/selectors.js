import { createSelector } from 'reselect';

const selectSymbols = () => state => state.get('addReport');

const getSymbolsList = () => createSelector(
   selectSymbols(),
   symbolsList => symbolsList.get('symbols'),
);

export {
  getSymbolsList,
};
