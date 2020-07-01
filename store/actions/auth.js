import {
  AUTH_USER,
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
} from '../constant';

export const authUser = auth => {
  return {
    type: AUTH_USER,
    payload: auth,
  };
};

export const registerCustomer = user => async dispatch => {
  try {
    const req = await fetch(
      'https://on-click-services.firebaseio.com/customers.json',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    const res = await req.json();
    dispatch({
      type: REGISTER_SUCCEED,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAILED,
      payload: err,
    });
  }
};

export const registerSeller = user => async dispatch => {
  try {
    const req = await fetch(
      'https://on-click-services.firebaseio.com/sellers.json',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    const res = await req.json();
    dispatch({
      type: REGISTER_SUCCEED,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAILED,
      payload: err,
    });
  }
};

export const loginAction = () => {
  return {
    type: LOGIN_SUCCEED,
  };
};

export const logoutAction = () => {
  return {
    type: LOGIN_FAILED,
  };
};
