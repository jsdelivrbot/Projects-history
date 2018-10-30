import { combineReducers } from 'redux';
import menuReducer from '../containers/Menu/reducer.js';

const rootReducer = combineReducers({
 menu: menuReducer
});

export default rootReducer;
