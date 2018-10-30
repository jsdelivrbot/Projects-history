import { combineReducers } from 'redux';
import companiesListReducer from './companiesListReducer';
import pathToStoreReducer from './pathToStoreReducer';
import productsServicesReducer from './productsServicesReducer';
import technologiesReducer from './technologiesReducer';
import userIdReducer from './userIdReducer';
import strategiesReducer from './strategiesReducer';
import relationshipReducer from './relationshipReducer';
import geographicAreaReducer from './geographicAreaReducer';

export default combineReducers (
	{
	  companiesListReducer,
	  pathToStoreReducer,
	  productsServicesReducer,
	  technologiesReducer,
	  userIdReducer,
	  strategiesReducer,
	  relationshipReducer,
	  geographicAreaReducer
	}
)