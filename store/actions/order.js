import {
  FAIL_ORDER,
  LOADING_ORDER,
  SUCCESS_ORDER,
  CLEAR_ORDER,
} from '../constant';

export const submitOrder = (user, service) => async (dispatch) => {
  console.log('user order', user);
  let order = {};

  order.name = user.name;
  order.phone = user.phone;
  order.customerId = user.customerId;
  order.location = user.location;
  order.Devicetoken = user.Devicetoken;
  order.profileUrl = user.profileUrl;
  const date = Date.now();
  order.service = service;
  order.orderDate = date;
  order.status = 'pending';

  dispatch({type: LOADING_ORDER});
  try {
    const req = await fetch(`https://on-click-s.firebaseio.com/orders.json`, {
      method: 'post',
      headers: {
        ContentType: 'application/json',
      },
      body: JSON.stringify(order),
    });
    const res = await req.json();
    res.error
      ? dispatch({
          type: FAIL_ORDER,
          payload: 'error',
        })
      : await fetch(
          `https://on-click-s.firebaseio.com/orders/${res.name}.json/`,
          {
            method: 'patch',
            headers: {
              ContentType: 'application/json',
            },
            body: JSON.stringify({orderId: res.name}),
          },
        ),
      dispatch({
        type: SUCCESS_ORDER,
        payload: res,
      });
  } catch (error) {
    dispatch({
      type: FAIL_ORDER,
      payload: 'error',
    });
  }
};

export const clearOrder = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_ORDER,
    });
  } catch (error) {
    console.log(error);
  }
};
