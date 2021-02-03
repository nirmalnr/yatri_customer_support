const orderActions = {
    FETCH_ORDERS: 'FETCH_ORDERS',
    ORDERS_FETCHED: 'ORDERS_FETCHED',
    NO_ORDERS_FOUND: 'NO_ORDERS_FOUND',
    VIEW_ORDER: 'VIEW_ORDER',
    ORDER_DETAILS_FETCHED: 'ORDER_DETAILS_FETCHED',
    INVALID_ORDER: 'INVALID_ORDER',
    fetchingOrders: (params) => ({
      type: orderActions.FETCH_ORDERS,
      payload: {...params}
    }),
    fetchedOrders: (orderList) => ({
        type: orderActions.ORDERS_FETCHED,
        payload: {
            orders: orderList
        }
    }),
    viewOrder: (id) => ({
      type: orderActions.VIEW_ORDER,
      payload: {
          id
      }
    }),
    fetchedOrderDetails: (order) => ({
        type: orderActions.ORDER_DETAILS_FETCHED,
        payload: {
            order
        }
    })
  };
  export default orderActions;
  