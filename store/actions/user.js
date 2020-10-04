import {isPointWithinRadius} from 'geolib';
import {
  GET_USER,
  FAILED_USER,
  GET_SELLERS,
  FAILED_SELLERS,
  START_LOADING,
  UPDATE_LOADING,
  NULL_SELLER,
  NOTIFICATION,
  NOTIFICATION_LOADING,
  UPLOAD_PROFILE,
  UPDATE_PROFILE,
  GET_NEAREST,
  GET_NEARBY,
  NULL_NEAREST,
  REQUEST_CUSTOMER,
  NULL_CUSTOMER,
  NOTIFICATION_ERROR,
  FAILED_UPDATE,
  FAILED_PROFILE,
  NULL_PROFILE,
} from '../constant';

export const getUser = userid => async dispatch => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/customers/${userid}.json`,
    );
    const res = await req.json();
    res.error
      ? dispatch({type: FAILED_USER, payload: res.error})
      : dispatch({
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
    res.error
      ? {
          type: FAILED_UPDATE,
          payload: 'res.error',
        }
      : dispatch({
          type: UPDATE_PROFILE,
          payload: res,
        });
  } catch (error) {
    dispatch({
      type: FAILED_UPDATE,
      payload: 'error',
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
    res.error
      ? dispatch({
          type: FAILED_PROFILE,
          payload: res.error,
        })
      : dispatch({
          type: UPLOAD_PROFILE,
          payload: res.profileUrl,
        });
  } catch (error) {
    dispatch({
      type: FAILED_PROFILE,
      payload: error,
    });
  }
};

export const nullProfile = () => dispatch => {
  dispatch({
    type: NULL_PROFILE,
    payload: null,
  });
};
//------------------------Getting Sellers

export const allSeller = (custLocation, service) => async dispatch => {
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
      const filterd = loaded.filter(
        itm =>
          itm.service === service.toLowerCase() &&
          itm.status === true &&
          isPointWithinRadius(
            {
              latitude: custLocation.latitude,
              longitude: custLocation.longitude,
            },
            {
              latitude: itm.latitude,
              longitude: itm.longitude,
            },
            itm.radius * 1000,
          ),
      );
      filterd.length < 1
        ? dispatch({
            type: FAILED_SELLERS,
            payload: error,
          })
        : dispatch({
            type: GET_SELLERS,
            payload: filterd,
          });
    }
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
    console.log('null seller', error);
  }
};

//------------------------------------nulling seller
export const nullNear = () => async dispatch => {
  try {
    const nullSell = {};
    dispatch({
      type: NULL_NEAREST,
      payload: nullSell,
    });
  } catch (error) {
    console.log('nnulling near', error);
  }
};

//---------------------------------Nearest partner

export const getNear = nearest => async dispatch => {
  try {
    dispatch({
      type: GET_NEAREST,
      payload: nearest,
    });
  } catch (error) {
    console.log('nearest partner ', error);
  }
};
//--------------------------------NearBy Partners List
export const nearbyPartners = nearby => async dispatch => {
  try {
    dispatch({
      type: GET_NEARBY,
      payload: nearby,
    });
  } catch (error) {
    console.log('nearby partners', error);
  }
};

//------------------------------------partner section

export const getPartner = userid => async dispatch => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${userid}.json`,
    );
    const res = await req.json();
    res.error
      ? dispatch({
          type: FAILED_USER,
          payload: res.error,
        })
      : dispatch({
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
    res.error
      ? dispatch({
          type: FAILED_UPDATE,
          payload: 'res.error',
        })
      : dispatch({
          type: UPDATE_PROFILE,
          payload: res,
        });
  } catch (error) {
    dispatch({
      type: FAILED_UPDATE,
      payload: 'res.error',
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
    res.error
      ? dispatch({
          type: FAILED_PROFILE,
          payload: res.error,
        })
      : dispatch({
          type: UPLOAD_PROFILE,
          payload: res.profileUrl,
        });
  } catch (error) {
    dispatch({
      type: FAILED_PROFILE,
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

//---------------------------updating status

export const updateRadius = (userid, radius) => async dispatch => {
  const req = await fetch(
    `https://on-click-s.firebaseio.com/sellers/${userid}.json`,
    {
      method: 'patch',
      ContentType: 'application/json',
      body: JSON.stringify({radius: radius.toFixed()}),
    },
  );
  const res = await req.json();
};

//----------------------sending Notification
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
          body: `${
            customerData.name
          } is looking for your service, check details !!!`,
          sound: 'default',
        },
        data: customerData,
      }),
    });
    const reso = await req.json();
    reso.error
      ? dispatch({type: NOTIFICATION_ERROR, payload: 'failed notification'})
      : dispatch({type: NOTIFICATION, payload: reso});
  } catch (error) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: 'failed notification',
    });
  }
};

//-------------------null noti
export const nullNotification = () => dispatch => {
  const error = null;
  dispatch({
    type: NOTIFICATION_ERROR,
    payload: error,
  });
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

//---------------------------Request customer data

export const requestCustomer = customer => async dispatch => {
  try {
    dispatch({
      type: REQUEST_CUSTOMER,
      payload: customer,
    });
  } catch (error) {
    console.log('req customer', error);
  }
};

//------------------------------------nulling request customer
export const nullCustomer = () => async dispatch => {
  try {
    const nullCust = {};
    dispatch({
      type: NULL_CUSTOMER,
      payload: nullCust,
    });
  } catch (error) {
    console.log('null customer', error);
  }
};
