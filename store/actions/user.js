import {
  GET_USER,
  FAILED_USER,
  GET_SELLERS,
  FAILED_SELLERS,
  START_LOADING,
  UPDATE_LOADING,
  FAILED_CLOSE,
  GET_CLOSE,
  NULL_SELLER,
  NOTIFICATION,
  NOTIFICATION_LOADING,
  UPLOAD_PROFILE,
  UPDATE_PROFILE,
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
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    const res = await req.json();
    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: FAILED_USER,
      payload: error,
    });
  }
};

//------------------------------customer profile
export const customerProfile = (userid, profileUrl) => async dispatch => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/customers/${userid}.json`,
      {
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({profileUrl}),
      },
    );
    const res = await req.json();
    console.log('resooo', res);
    dispatch({
      type: UPLOAD_PROFILE,
      payload: res.profileUrl,
    });
  } catch (error) {
    console.log('uploading error');
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
        type: FAILED_SELLERS,
        payload: error,
      });
    } else {
      const vl = Object.keys(res);
      vl.map(item => loaded.push(res[item]));
    }
    const filterd = loaded.filter(
      itm => itm.service === service.toLowerCase() && itm.status === true,
    );
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

//------------------------------------nulling seller
export const nullSeller = () => async dispatch => {
  try {
    const nullSell = [];
    dispatch({
      type: NULL_SELLER,
      payload: nullSell,
    });
  } catch (error) {
    dispatch({
      type: FAILED_CLOSE,
      payload: error,
    });
  }
};

//------------------------------------partner section

export const getPartner = userid => async dispatch => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${userid}.json`,
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

export const updatePartner = (userid, user) => async dispatch => {
  dispatch({
    type: UPDATE_LOADING,
  });
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${userid}.json`,
      {
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify(user),
      },
    );
    const res = await req.json();
    console.log('my fucki', res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: FAILED_USER,
      payload: error,
    });
  }
};

//------------------------------partner profile
export const partnerProfile = (userid, profileUrl) => async dispatch => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${userid}.json`,
      {
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({profileUrl}),
      },
    );
    const res = await req.json();
    console.log('resooo', res);
    dispatch({
      type: UPLOAD_PROFILE,
      payload: res.profileUrl,
    });
  } catch (error) {
    console.log('uploading error');
    dispatch({
      type: FAILED_USER,
      payload: error,
    });
  }
};

export const partnerId = userid => async dispatch => {
  const req = await fetch(
    `https://on-click-s.firebaseio.com/sellers/${userid}.json`,
    {
      method: 'patch',
      ContentType: 'application/json',
      body: JSON.stringify({partnerKey: userid}),
    },
  );
  const res = await req.json();
};

//---------------------------updating status

export const updateStatus = (userid, status) => async dispatch => {
  const req = await fetch(
    `https://on-click-s.firebaseio.com/sellers/${userid}.json`,
    {
      method: 'patch',
      ContentType: 'application/json',
      body: JSON.stringify({status: status}),
    },
  );
  const res = await req.json();
};

export const sendingNotification = (token, customerData) => async dispatch => {
  dispatch({type: NOTIFICATION_LOADING});
  try {
    customerData.date = Date.now();
    const req = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAuLwgx98:APA91bEHs_XI72VjkoOYNXrERce2paTgLcc0_xDic60YQMSWOkKSJ2DoEJBUm4IATBuVCA2ft81bIFbj6legdM-KjwQmDUnhbSQAjfvPlGpPQ6x_LbGQKI0D0UtNKrdUeCi88ug-lD1f',
      },
      body: JSON.stringify({
        to: token,
        direct_book_ok: true,
        notification: {
          title: 'Dear Partner,',
          body: `${customerData.name} is looking for your service !!!`,
          sound: 'default',
        },
        data: customerData,
      }),
    });
    const reso = await req.json();
    reso.error ? null : dispatch({type: NOTIFICATION, payload: reso});
    console.log('mynotireso======= >', reso);
  } catch (error) {
    console.log('notification sending err ..', error);
  }
};

export const jobRequest = (userid, job) => async dispatch => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${userid}/jobs.json`,
      {
        method: 'post',
        ContentType: 'application/json',
        body: JSON.stringify(job),
      },
    );
    const res = await req.json();
  } catch (error) {
    console.log('job sendeing err', error);
  }
};
