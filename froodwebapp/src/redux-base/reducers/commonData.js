// @flow
import {
  GET_COMMON_DATA,
  STATE_CITIES_GET,
  DELIVERY_INFO_GET_PARALLEL,
  LOGOUT
} from 'redux-base/actions';

type CommonDataArray = Array<{ id: number, name: string }>;

// --------------------------- Reducer function --------------------------
const initialState: {
  // triggers
  commonDataLoading: boolean,
  commonDataLoaded: boolean,
  // countries & cities
  countries: CommonDataArray,
  countryStates: CommonDataArray,
  userCountryStates: CommonDataArray,
  cities: CommonDataArray,
  // money
  currencies: CommonDataArray,
  payterms: CommonDataArray,
  // locations
  locationTypes: CommonDataArray,
  defaultLocations: CommonDataArray,
  zoneTypes: CommonDataArray,
  // sku
  categories: CommonDataArray,
  skuStatusTypes: CommonDataArray,
  allocationTypes: CommonDataArray,
  // other
  deliveryMethods: CommonDataArray,
  shippingMethods: CommonDataArray,
  adjustmentReasons: CommonDataArray,
  taxCategories: CommonDataArray
} = {
  // triggers
  commonDataLoading: false,
  commonDataLoaded: false,
  // countries & cities
  countries: [],
  countryStates: [],
  userCountryStates: [],
  cities: [],
  // money
  currencies: [],
  payterms: [],
  // locations
  locationTypes: [],
  defaultLocations: [],
  zoneTypes: [],
  // sku
  categories: [],
  skuStatusTypes: [],
  allocationTypes: [],
  // other
  deliveryMethods: [],
  deliveryMethodInfo: {},
  deliverySlotsInfo: [],
  shippingMethods: [],
  promotionFields: {},
  adjustmentReasons: [],
  taxCategories: [],
  orderTypes: []
};

export default function commonData(
  state: Object = initialState,
  action: Object = {}
) {
  switch (action.type) {
    case GET_COMMON_DATA.REQUEST:
      return {
        ...state,
        commonDataLoading: true,
      };
    case GET_COMMON_DATA.SUCCESS:
      return {
        ...state,
        // triggers
        commonDataLoading: false,
        commonDataLoaded: true,
        // countries & cities
        countries: action.data.countries,
        countryStates: action.data.countryStates,
        userCountryStates: action.data.states,
        // money
        currencies: action.data.currencies,
        payterms: action.data.paymentTerms,
        // locations
        locationTypes: action.data.locationTypes,
        defaultLocations: action.data.defaultLocations,
        zoneTypes: action.data.zoneTypes,
        // sku
        categories: action.data.categories,
        skuStatusTypes: action.data.skuStatusTypes,
        allocationTypes: action.data.allocationTypes,
        // other
        deliveryMethods: action.data.transporters,
        shippingMethods: action.data.shippingMethods,
        promotionFields: action.data.promotionFields,
        adjustmentReasons: action.data.adjustmentReasons,
        taxCategories: action.data.taxCategories,
        orderTypes: action.data.orderTypes
      };
    case STATE_CITIES_GET.SUCCESS:
      return {
        ...state,
        cities: action.data,
      };
    case DELIVERY_INFO_GET_PARALLEL.SUCCESS:
      return {
        ...state,
        deliveryMethodInfo: action.data[0],
        deliverySlotsInfo: action.data[1]
      };
    case LOGOUT:
      return initialState;
    default:
      return {
        ...state
      };
  }
}
