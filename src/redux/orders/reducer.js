import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
    fetchedOrders: [],
    errMsg: "",
    loading: false,
    fetchingOrderDetails: false,
    selectedOrder: {}
});

export default function orderReducer(
    state = initState,
    action
) {
    switch (action.type) {
        case actions.FETCH_ORDERS:
            state.set('errMsg', "");
            return state.set('loading', true);
        case actions.ORDERS_FETCHED:
            state.set('loading', false);
            state.set('fetchedOrders', action.payload.orders);
            return state;
        case actions.NO_ORDERS_FOUND:
            state.set('loading', false);
            return state.set('errMsg', "No orders found");
        case actions.VIEW_ORDER:
            return state.set('fetchingOrderDetails', true);
        case actions.ORDER_DETAILS_FETCHED:
            state.set('fetchingOrderDetails', false);
            return state.set('selected', action.payload.order);
        case actions.INVALID_ORDER:
            state.set('fetchingOrderDetails', false);
            state.set('errMsg', "Invalid Order ID");
            return state.set('selectedOrder', {});
        default:
            return state;
    }
}
