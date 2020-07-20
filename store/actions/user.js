import {
  GET_USER,
  FAILED_USER,
  GET_SELLERS,
  FAILED_SELLERS,
  START_LOADING,
  UPDATE_LOADING,
} from '../constant';

export const getUser = userid => async dispatch => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/customers/${userid}.json`,
    );
    const res = await req.json();
    dispatch({
      type: GET_USER,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: FAILED_USER,
      payload: error,
    });
  }
};

export const updateName = (userid, user) => async dispatch => {
  dispatch({
    type: UPDATE_LOADING,
  });
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/customers/${userid}.json`,
      {
        method: 'put',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    const res = await req.json();
    dispatch({
      type: GET_USER,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: FAILED_USER,
      payload: error,
    });
  }
};

//------------------------Getting Sellers

export const allSeller = service => async dispatch => {
  dispatch({
    type: START_LOADING,
  });
  try {
    const req = await fetch(`https://on-click-s.firebaseio.com/sellers.json`);
    const res = await req.json();
    let loaded = [];
    if (res.error) {
      dispatch({
        type: FAILED_USER,
        payload: error,
      });
    } else {
      const vl = Object.keys(res);
      vl.map(item => loaded.push(res[item]));
    }
    const filterd = loaded.filter(itm => itm.service === service.toLowerCase());
    dispatch({
      type: GET_SELLERS,
      payload: filterd,
    });
  } catch (error) {
    dispatch({
      type: FAILED_SELLERS,
      payload: error,
    });
  }
};
