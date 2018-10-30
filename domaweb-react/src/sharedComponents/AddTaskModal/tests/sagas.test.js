import * as actions from '../actions'
import { call, put } from 'redux-saga/effects'

describe('Saga', () => {
    it('should call the api on first action dispatch, and dispatch a success action', () => {
        const iterator = actions.getCustomersList();

        // Assert that it called the api
        expect(iterator.next().value).toEqual(call(actions.loadCustomers));

        // Assert that it dispatched the success action because the api didn't return an error code
        const data = {};

        expect(iterator.next(defaults).value, put(actions.loadCustomersSuccess(data)));
    });

    /it('should call the api on first action dispatch, and dispatch a fail action', () => {
        const iterator = actions.getCustomersList();

        // Assert that it called the api
        expect(iterator.next().value).toEqual(call(actions.fetchFromApi, 'asdf'));

        // Assert that it dispatched the fail action because the api call threw an error
        const error = {};

        expect(iterator.throw(error).value, put(actions.loadCustomersFailed(error)));
    });
});
