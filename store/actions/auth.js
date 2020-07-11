import {
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  SELLER_LOGIN_FAILED,
  SELLER_REGISTER_FAILED,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
} from '../constant';
import AsyncStorage from '@react-native-community/async-storage';

// ------------------------------------------------------------------Register Customer

export const registerCustomer = user => async dispatch => {
  try {
    const {email, password, phone, name} = user;
    const authUser = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({email, password}),
      },
    );
    const res = await authUser.json();
    const userId = res.localId;
    if (!res.error) {
      await fetch(
        `https://on-click-s.firebaseio.com/customers/${userId}.json`,
        {
          method: 'put',
          headers: {
            ContentType: 'application/json',
          },
          body: JSON.stringify({name, email, phone}),
        },
      );
    }
    if (res.error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: 'error',
      });
    } else {
      dispatch({
        type: REGISTER_SUCCEED,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAILED,
      payload: err,
    });
  }
};

//------------------------------------------------------------Register Seller

export const registerSeller = user => async dispatch => {
  try {
    const {name, email, phone, service, password} = user;
    const authUser = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({email, password}),
      },
    );

    const res = await authUser.json();
    const userId = res.localId;
    if (!res.error) {
      await fetch(`https://on-click-s.firebaseio.com/sellers/${userId}.json`, {
        method: 'put',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({name, email, phone, service}),
      });
    }
    if (res.error) {
      dispatch({
        type: SELLER_REGISTER_FAILED,
        payload: 'error',
      });
    } else {
      dispatch({
        type: REGISTER_SUCCEED,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: SELLER_REGISTER_FAILED,
      payload: err,
    });
  }
};

//----------------------------------------- Login Action

export const loginAction = user => async dispatch => {
  try {
    const {email, password} = user;
    const signReq = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    const res = await signReq.json();
    console.log('cust res', res);
    const userid = res.localId;
    if (res.error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: 'Error',
      });
    } else {
      dispatch({
        type: LOGIN_SUCCEED,
        payload: res,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error,
    });
  }
};

//-----------------------------------------  seller Login Action

export const sellerLoginAction = user => async dispatch => {
  try {
    const {email, password} = user;
    const signReq = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    const res = await signReq.json();
    const userid = res.localId;
    if (res.error) {
      dispatch({
        type: SELLER_LOGIN_FAILED,
        payload: 'Error',
      });
    } else {
      dispatch({
        type: LOGIN_SUCCEED,
        payload: userid,
      });
    }
  } catch (error) {
    dispatch({
      type: SELLER_LOGIN_FAILED,
      payload: error,
    });
  }
};

//----------------------------------------------------------------------logout Action
export const logoutAction = () => async dispatch => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log('error');
  }
};

//-----------------------------------------------------------------------Change password

export const changePassword = (idToken, password) => async dispatch => {
  try {
    const req = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {ContentType: 'application/json'},
        body: JSON.stringify({idToken, password}),
      },
    );
    const res = await req.json();
    if (res.error) {
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
        payload: error,
      });
    } else {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAILED,
      payload: error,
    });
  }
};

//-----------------------------------------------------------------------Reset password

export const resetPassword = email => async dispatch => {
  try {
    const requestType = 'PASSWORD_RESET';
    const req = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {ContentType: 'application/json'},
        body: JSON.stringify({requestType, email}),
      },
    );
    const res = await req.json();
    console.log('this is res of rest', res);
    if (res.error) {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: res.error,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    console.log('fuck', error);
    dispatch({
      type: RESET_PASSWORD_FAILED,
      payload: error,
    });
  }
};
