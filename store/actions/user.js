import {GET_USER, FAILED_USER} from '../constant';

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
    console.log('thisss', res);
  } catch (error) {
    console.log('thiss err', error);
  }
};
